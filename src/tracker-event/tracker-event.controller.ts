import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTrackerEvent } from './tracker-event.request';
import { TrackerEventService } from './tracker-event.service';
import { ApplicationsCheckerGuard } from 'src/applications/applications.guard';

@Controller('mouse-tracker')
export class TrackerEventController {
  constructor(private readonly trackerEventService: TrackerEventService) {}

  @Post()
  @UseGuards(ApplicationsCheckerGuard)
  createTrackerEvent(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    data: CreateTrackerEvent,
  ) {
    return this.trackerEventService.create(data);
  }
}
