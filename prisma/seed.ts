import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const superAdminEmail = 'superadmin@aluguel.com';
  // You can change this password later or via env variables if you prefer
  const superAdminPassword = await bcrypt.hash('admin123', 10);

  const existingSuperAdmin = await prisma.user.findUnique({
    where: { email: superAdminEmail },
  });

  if (!existingSuperAdmin) {
    const superAdmin = await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: superAdminEmail,
        password: superAdminPassword,
        role: 'SUPER_ADMIN',
      },
    });
    console.log('Superadmin created with email:', superAdmin.email);
  } else {
    console.log('Superadmin already exists with email:', superAdminEmail);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });