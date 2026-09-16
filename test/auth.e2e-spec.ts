import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Create a tenant first to get a user
    await request(app.getHttpServer())
      .post('/tenants')
      .send({
        organizationName: 'Auth Test Org',
        adminName: 'Auth Admin',
        adminEmail: 'authadmin@example.com',
        adminPassword: 'authpassword123'
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'authadmin@example.com',
        password: 'authpassword123'
      })
      .expect(201);

    expect(response.body).toHaveProperty('access_token');
  });

  it('/auth/login (POST) - failure', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'authadmin@example.com',
        password: 'wrongpassword'
      })
      .expect(401);
  });
});
