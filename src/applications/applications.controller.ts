import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'src/auth/auth.service';
import { ApplicationMembershipGuard, Roles } from './applications-member.guard';
import {
  AddUserToApplication,
  CreateApplication,
} from './applications.request';
import { ApplicationRoles, ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllUserApplications(@Request() req: { user: JwtPayload }) {
    return this.applicationsService.getAllUserApplications(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('first')
  getFirstUserApplications(@Request() req: { user: JwtPayload }) {
    return this.applicationsService.getFirstUserApplicationId(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get(':applicationId')
  getApplication(@Param('applicationId') applicationId: string) {
    return this.applicationsService.getApplication(applicationId);
  }

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
