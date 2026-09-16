import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('TenantsController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/tenants (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/tenants')
      .send({
        organizationName: 'Test Org',
        document: '12345678900',
        adminName: 'Test Admin',
        adminEmail: 'testadmin@example.com',
        adminPassword: 'securepassword123'
      })
      .expect(201);

    expect(response.body).toHaveProperty('organizationId');
    expect(response.body.organizationName).toBe('Test Org');
    expect(response.body).toHaveProperty('adminId');
    expect(response.body.adminEmail).toBe('testadmin@example.com');
  });

  it('/tenants (POST) - duplicate email', async () => {
    await request(app.getHttpServer())
      .post('/tenants')
      .send({
        organizationName: 'Test Org 2',
        adminName: 'Test Admin',
        adminEmail: 'testadmin@example.com',
        adminPassword: 'securepassword123'
      })
      .expect(400);
  });
});
