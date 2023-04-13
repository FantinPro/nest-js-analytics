import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUser } from './users.request';

@Controller('user')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getUsers() {
    return await this.prisma.user.findMany();
  }

  @Post()
  async createUser(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    data: CreateUser,
  ) {
    return await this.prisma.user.create({
      data,
    });
  }
}
