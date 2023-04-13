import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class ApplicationsCheckerGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const body = context.switchToHttp().getRequest().body;

    if (!body.applicationId) {
      throw new HttpException(
        'applicationId is required',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const application = await this.prisma.application.findUnique({
      where: {
        id: body.applicationId,
      },
    });

    if (!application) {
      throw new HttpException('application not found', HttpStatus.NOT_FOUND);
    }

    return true;
  }
}
