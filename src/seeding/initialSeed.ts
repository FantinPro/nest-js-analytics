import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { ApplicationRoles } from '../applications/applications.service';
import { appUserFactory } from './factory';

const prisma = new PrismaClient();

async function main() {
  if (!(await prisma.user.count())) {
    const robertUser = await prisma.user.create({
      data: {
        name: 'robert',
        email: 'robert@gmail.com',
        password: hashSync('test', 10),
      },
    });

    const basicUser = await prisma.user.create({
      data: {
        name: 'basic',
        email: 'basic@gmail.com',
        password: hashSync('test', 10),
      },
    });

    const application = await prisma.application.create({
      data: {
        name: "Robert's app for esgi DEMO",
        secret: 'ESGIed059713-1de3-4c94-b46b-0c3f2c16105b',
        origin: 'https://monsupersite.com',
      },
    });

    await prisma.appUser.create({
      data: appUserFactory(
        robertUser.id,
        application.id,
        ApplicationRoles.ADMIN,
      ),
    });
    await prisma.appUser.create({
      data: appUserFactory(
        basicUser.id,
        application.id,
        ApplicationRoles.BASIC,
      ),
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
