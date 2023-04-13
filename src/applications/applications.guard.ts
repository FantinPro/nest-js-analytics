import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'src/auth/auth.service';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class ApplicationsGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    const body = request.body as { applicationId: string };

    if (!body.applicationId) {
      throw new HttpException(
        'applicationId is required',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const appUser = await this.prisma.appUser.findUnique({
      where: {
        userId_applicationId: {
          userId: user.id,
          applicationId: body.applicationId,
        },
      },
    });

    if (!appUser) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
