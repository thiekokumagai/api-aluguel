import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('RentersController (e2e)', () => {
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
        organizationName: 'Renter Org',
        adminName: 'Renter Admin',
        adminEmail: 'renter@example.com',
        adminPassword: 'password123'
      });
      
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'renter@example.com', password: 'password123' });
    token = login.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/renters (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/renters')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        document: '12345678900'
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John Doe');
  });

  it('/renters (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/renters')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].name).toBe('John Doe');
  });
});
