import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApplicationMembershipGuard,
  Roles,
} from 'src/applications/applications.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateMouseTracker } from './mouse-tracker.request';
import { MouseTrackerService } from './mouse-tracker.service';
import { ApplicationRoles } from 'src/applications/applications.service';

@Controller('mouse-tracker')
export class MouseTrackerController {
  constructor(private readonly mouseTrackerService: MouseTrackerService) {}

  @Roles(ApplicationRoles.ADMIN)
  @UseGuards(AuthGuard, ApplicationMembershipGuard)
  @Post()
  createMouseTracker(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    data: CreateMouseTracker,
  ) {
    return this.mouseTrackerService.create(data);
  }
}
