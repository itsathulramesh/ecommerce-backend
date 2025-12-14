// src/models/prisma.js
require('dotenv').config();            // ensure env is loaded as early as possible

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

// quick sanity logs (remove in production)
console.log('> Using DATABASE_URL:', !!connectionString);
if (!connectionString) {
  console.error('ERROR: process.env.DATABASE_URL is empty or not loaded.');
  throw new Error('DATABASE_URL not set');
}

// Create a pg Pool (recommended) and pass it to the adapter
const pool = new Pool({ connectionString });

// optional: test pool connection once (helpful for debugging)
(async () => {
  try {
    const client = await pool.connect();
    await client.release();
    console.log('> Postgres pool connected OK');
  } catch (e) {
    console.error('> Postgres pool failed to connect:', e && e.message);
  }
})();

const adapter = new PrismaPg(pool);

// Instantiate Prisma with the adapter
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
