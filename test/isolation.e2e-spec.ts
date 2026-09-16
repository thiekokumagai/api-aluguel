import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/core/prisma/prisma.service';
import { ClsService } from 'nestjs-cls';
import { PrismaClient } from '@prisma/client';

describe('Data Isolation (e2e)', () => {
  let app: INestApplication<App>;
  let tokenA: string;
  let tokenB: string;
  let orgBId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Create Tenant A
    await request(app.getHttpServer())
      .post('/tenants')
      .send({
        organizationName: 'Tenant A',
        adminName: 'Admin A',
        adminEmail: 'adminA@example.com',
        adminPassword: 'password123'
      });
      
    const loginA = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'adminA@example.com', password: 'password123' });
    tokenA = loginA.body.access_token;

    // Create Tenant B
    const resB = await request(app.getHttpServer())
      .post('/tenants')
      .send({
        organizationName: 'Tenant B',
        adminName: 'Admin B',
        adminEmail: 'adminB@example.com',
        adminPassword: 'password123'
      });
    orgBId = resB.body.organizationId;
      
    const loginB = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'adminB@example.com', password: 'password123' });
    tokenB = loginB.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('Tenant A should not be able to read Tenant B organization data via direct query (simulated isolation)', async () => {
    const prisma = app.get(PrismaService) as PrismaClient;
    const cls = app.get(ClsService);
    
    await cls.runWith({ tenantId: orgBId, role: 'ADMIN' }, async () => {
       // While acting as Tenant B, try to find Tenant A's user (should fail)
       const userA = await prisma.user.findFirst({ where: { email: 'adminA@example.com' } });
       expect(userA).toBeNull(); // Because tenantId in CLS is orgBId
    });
  });
});
