const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ทดสอบการเชื่อมต่อเมื่อเริ่มต้น
prisma.$connect()
  .then(() => console.log('Connected to MySQL database via Prisma'))
  .catch((err) => console.error('Failed to connect to MySQL via Prisma:', err));

module.exports = prisma;