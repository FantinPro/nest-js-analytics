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
    const headers = context.switchToHttp().getRequest().headers;

    const applicationId = headers['x-application-id'];
    const applicationSecret = headers['x-application-secret'];
    const origin = headers.origin;

    let application = null;
    if (!origin) {
      // from backend
      application = await this.prisma.application.findFirst({
        where: {
          id: applicationId,
          secret: applicationSecret,
        },
      });
    } else {
      // from frontend

      console.log('origin', origin);
      console.log('applicationId', applicationId);
      application = await this.prisma.application.findFirst({
        where: {
          id: applicationId,
          origin,
        },
      });
    }

    if (!application) {
      throw new HttpException('application not found', HttpStatus.NOT_FOUND);
    }

    return true;
  }
}
