import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from 'src/core/core.module';
import { TrackerEventController } from './tracker-event.controller';
import { TrackerEventSchema } from './tracker-event.schema';
import { TrackerEventService } from './tracker-event.service';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forFeature([
      { name: 'TrackerEvent', schema: TrackerEventSchema },
    ]),
  ],
  controllers: [TrackerEventController],
  providers: [TrackerEventService],
})
export class TrackerEventModule {}
