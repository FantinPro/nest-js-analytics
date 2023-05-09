import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackerEventSchema } from './tracker-event.schema';
import { TrackerEventController } from './tracker-event.controller';
import { TrackerEventService } from './tracker-event.service';
import { CoreModule } from 'src/core/core.module';

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
