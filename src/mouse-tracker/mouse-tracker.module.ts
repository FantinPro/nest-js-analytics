import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MouseTrackerSchema } from './mouseTracker.schema';
import { MouseTrackerController } from './mouse-tracker.controller';
import { MouseTrackerService } from './mouse-tracker.service';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forFeature([
      { name: 'MouseTracker', schema: MouseTrackerSchema },
    ]),
  ],
  controllers: [MouseTrackerController],
  providers: [MouseTrackerService],
})
export class MouseTrackerModule {}
