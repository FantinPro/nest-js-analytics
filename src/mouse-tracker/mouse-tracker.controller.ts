import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMouseTracker } from './mouse-tracker.request';
import { MouseTrackerService } from './mouse-tracker.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApplicationsGuard } from 'src/applications/applications.guard';

@Controller('mouse-tracker')
export class MouseTrackerController {
  constructor(private readonly mouseTrackerService: MouseTrackerService) {}

  @UseGuards(AuthGuard, ApplicationsGuard)
  @Post()
  createUser(
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
