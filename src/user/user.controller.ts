import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getUsers() {
    return await this.prisma.user.findMany();
  }

  @Post()
  async User(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    data: CreateUserDto,
  ) {
    return await this.prisma.user.create({
      data,
    });
  }
}
