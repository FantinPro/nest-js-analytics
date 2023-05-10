import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrackerEvent } from './tracker-event.schema';
import { CreateTrackerEvent } from './tracker-event.request';

@Injectable()
export class TrackerEventService {
  constructor(
    @InjectModel('TrackerEvent')
    private readonly TrackerEventModel: Model<TrackerEvent>,
  ) {}

  async create(data: CreateTrackerEvent): Promise<TrackerEvent> {
    const createdTrackerEvent = new this.TrackerEventModel(data);
    return createdTrackerEvent.save();
  }

  async createMany(data: CreateTrackerEvent[]): Promise<TrackerEvent[]> {
    const createdTrackerEvents = data.map(
      (trackerEvent) => new this.TrackerEventModel(trackerEvent),
    );
    return this.TrackerEventModel.insertMany(createdTrackerEvents);
  }
}
