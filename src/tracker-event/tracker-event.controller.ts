import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ApplicationMembershipGuard } from 'src/applications/applications-member.guard';
import { ApplicationsCheckerGuard } from 'src/applications/applications.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTrackerEvent } from './tracker-event.request';
import { TrackerEventService } from './tracker-event.service';

@Controller('tracker-event')
export class TrackerEventController {
  constructor(private readonly trackerEventService: TrackerEventService) {}

  @Post()
  @UseGuards(ApplicationsCheckerGuard)
  async createTrackerEvent(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    data: CreateTrackerEvent[],
  ) {
    return this.trackerEventService.createMany(data);
  }

  @Get(':applicationId')
  @UseGuards(AuthGuard, ApplicationMembershipGuard)
  async getApplicationEvents(
    @Param('applicationId') applicationId: string,
    @Query('width') width: number,
    @Query('height') height: number,
    @Query('event_type') event_type?: 'mousemove' | 'click',
  ) {
    if (!width || !height) {
      throw new HttpErrorByCode[400](
        'width and height are required in the query',
      );
    }

    return this.trackerEventService.findAllAndTransform(
      applicationId,
      { width, height },
      event_type,
    );
  }
}
