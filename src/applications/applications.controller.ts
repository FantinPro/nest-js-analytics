import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  AddUserToApplication,
  CreateApplication,
} from './applications.request';
import { ApplicationRoles, ApplicationsService } from './applications.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'src/auth/auth.service';
import { ApplicationMembershipGuard, Roles } from './applications-member.guard';

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

  @Roles(ApplicationRoles.ADMIN)
  @UseGuards(AuthGuard, ApplicationMembershipGuard)
  @Post(':applicationId/users')
  addUserToApplication(
    @Param('applicationId') applicationId: string,
    @Body() body: AddUserToApplication,
  ) {
    return this.applicationsService.addUsersToApplication(applicationId, body);
  }

  @Roles(ApplicationRoles.ADMIN)
  @UseGuards(AuthGuard, ApplicationMembershipGuard)
  @Delete(':applicationId/users/:userId')
  removeUserToApplication(
    @Param('applicationId') applicationId: string,
    @Param('userId') userId: string,
  ) {
    return this.applicationsService.removeUsersToApplication(
      applicationId,
      userId,
    );
  }
}
