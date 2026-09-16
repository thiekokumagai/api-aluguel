import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('PropertiesController (e2e)', () => {
  let app: INestApplication<App>;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Create Tenant and Login
    await request(app.getHttpServer())
      .post('/tenants')
      .send({
        organizationName: 'Prop Org',
        adminName: 'Prop Admin',
        adminEmail: 'prop@example.com',
        adminPassword: 'password123'
      });
      
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'prop@example.com', password: 'password123' });
    token = login.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/properties (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/properties')
      .set('Authorization', `Bearer ${token}`)
      .send({
        address: '123 Fake St',
        description: 'A nice house'
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.address).toBe('123 Fake St');
  });

  it('/properties (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/properties')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].address).toBe('123 Fake St');
  });
});
