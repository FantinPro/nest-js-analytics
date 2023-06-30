import { fakerFR as faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';

export function userFactory(): Prisma.UserCreateInput {
  return {
    name: faker.person.lastName(),
    email: faker.internet.email(),
    password: hashSync('test', 10),
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
    role: faker.word.sample(),
  };
}
