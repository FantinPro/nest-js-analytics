import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MouseTracker } from './mouseTracker.schema';
import { CreateMouseTracker } from './mouse-tracker.request';

@Injectable()
export class MouseTrackerService {
  constructor(
    @InjectModel('MouseTracker')
    private readonly mouseTrackerModel: Model<MouseTracker>,
  ) {}

  async create(data: CreateMouseTracker): Promise<MouseTracker> {
    const createdMouseTracker = new this.mouseTrackerModel(data);
    return createdMouseTracker.save();
  }
}
