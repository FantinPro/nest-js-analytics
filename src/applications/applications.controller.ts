import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateApplication } from './applications.request';
import { ApplicationsService } from './applications.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'src/auth/auth.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @UseGuards(AuthGuard)
  @Post()
  createApplication(
    @Request() req: { user: JwtPayload },
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    data: CreateApplication,
  ) {
    return this.applicationsService.createApplication(data, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post(':applicationId/users')
  addUserToApplication() {
    return 'addUserToApplication';
  }
}
