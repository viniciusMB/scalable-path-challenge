import { PrismaClient } from '@prisma/client';

import { createProductsSeed } from './seeds/create-products.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...\n');

  await createProductsSeed(prisma);
}

main()
  .then(async () => {
    console.log('\nSeed executed successfully');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
