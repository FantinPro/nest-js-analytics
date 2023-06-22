import { PrismaClient } from '@prisma/client';
import { userFactory, applicationFactory, appUserFactory } from './factory';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 15; i++) {
    const user = await prisma.user.create({
      data: userFactory(),
    });

    const application = await prisma.application.create({
      data: applicationFactory(),
    });

    await prisma.appUser.create({
      data: appUserFactory(user.id, application.id),
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Done seeding.');
  });
