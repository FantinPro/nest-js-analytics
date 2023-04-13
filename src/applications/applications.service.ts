import { Injectable } from '@nestjs/common';
import { Application } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateApplication } from './applications.request';
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
}
