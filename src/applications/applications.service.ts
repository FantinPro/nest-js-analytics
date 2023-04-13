import { Injectable } from '@nestjs/common';
import { AppUser, Application } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import {
  AddUserToApplication,
  CreateApplication,
} from './applications.request';
import { v4 as uuidv4 } from 'uuid';

export enum ApplicationRoles {
  BASIC = 'BASIC',
  ADMIN = 'ADMIN',
}

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createApplication(
    application: CreateApplication,
    userId: string,
  ): Promise<Application> {
    const secret = `ESGI${uuidv4()}`;
    return this.prisma.application.create({
      data: {
        ...application,
        secret,
        users: {
          create: {
            role: ApplicationRoles.ADMIN,
            User: {
              connect: {
                id: userId,
              },
            },
          },
        },
      },
    });
  }

  async addUsersToApplication(
    applicationId: string,
    data: AddUserToApplication,
  ): Promise<AppUser> {
    return this.prisma.appUser.create({
      data: {
        role: ApplicationRoles.BASIC,
        User: { connect: { id: data.userId } },
        Application: { connect: { id: applicationId } },
      },
    });
  }

  async removeUsersToApplication(
    applicationId: string,
    userId: string,
  ): Promise<AppUser> {
    return this.prisma.appUser.delete({
      where: {
        userId_applicationId: {
          userId: userId,
          applicationId: applicationId,
        },
      },
    });
  }
}
