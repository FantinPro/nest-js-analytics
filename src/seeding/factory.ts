import { fakerFR as faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

export function userFactory(): Prisma.UserCreateInput {
  return {
    name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export function applicationFactory(): Prisma.ApplicationCreateInput {
  return {
    name: faker.company.name(),
    secret: faker.string.alphanumeric(),
    origin: faker.internet.url(),
  };
}

export function appUserFactory(
  userId: string,
  applicationId: string,
): Prisma.AppUserCreateInput {
  return {
    User: {
      connect: {
        id: userId,
      },
    },
    Application: {
      connect: {
        id: applicationId,
      },
    },
    role: faker.random.word(),
  };
}
