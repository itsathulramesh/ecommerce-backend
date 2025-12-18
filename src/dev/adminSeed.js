// src/dev/adminSeed.js
require('dotenv').config();

const prisma = require('../models/prisma'); // ✅ USE YOUR CLIENT
const bcrypt = require('bcrypt');

async function main() {
  const adminEmail = 'admin@myapp.com';
  const adminPassword = 'Admin@123';

  console.log('🌱 Running admin seed...');

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('ℹ️ Admin already exists. Skipping creation.');
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created successfully');
}

main()
  .catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
