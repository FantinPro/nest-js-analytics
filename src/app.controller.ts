import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './core/prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getHello() {
    return this.prisma.application.findFirst({
      where: {
        id: '54ce5952-fb4d-4390-994f-c0b05b7fe4d8',
        origin: 'http://localhost:5137',
      },
    });
  }
}
