import { Injectable } from '@nestjs/common';
import { AppUser, Application } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import {
  AddUserToApplication,
  CreateApplication,
} from './applications.request';

export enum ApplicationRoles {
  BASIC = 'BASIC',
  ADMIN = 'ADMIN',
}

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async updateApplication(
    applicationId: string,
    data: Partial<Application>,
  ): Promise<Application> {
    return this.prisma.application.update({
      where: {
        id: applicationId,
      },
      data,
    });
  }

  async deleteApplication(applicationId: string): Promise<Application> {
    return this.prisma.application.delete({
      where: {
        id: applicationId,
      },
    });
  }

  async getApplication(applicationId: string): Promise<Application> {
    return this.prisma.application.findUnique({
      where: {
        id: applicationId,
      },
    });
  }

  async getFirstUserApplicationId(userId: string): Promise<{ id: string }> {
    const userToApp = await this.prisma.appUser.findFirst({
      where: {
        userId,
      },
      select: {
        Application: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        Application: {
          name: 'asc',
        },
      },
    });

    return userToApp.Application;
  }

  async getAllUserApplications(userId: string): Promise<Application[]> {
    const userToApp = await this.prisma.appUser.findMany({
      where: {
        userId,
      },
      select: {
        Application: true,
        role: true,
      },
      orderBy: {
        Application: {
          name: 'asc',
        },
      },
    });

    return userToApp.map((appUser) => appUser.Application);
  }

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
