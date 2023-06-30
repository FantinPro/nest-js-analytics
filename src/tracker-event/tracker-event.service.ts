import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrackerEvent } from './tracker-event.request';
import { TrackerEvent } from './tracker-event.schema';
type Event = 'mousemove' | 'click';

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

  private addToMap(
    map: Map<string, number>,
    key: string,
    minMax: { min: number; max: number },
  ) {
    if (map.has(key)) {
      // check for mini

      const newValue = map.get(key) + 1;
      if (newValue > minMax.max) {
        minMax.max = newValue;
      }

      map.set(key, newValue);
    } else {
      map.set(key, 1);
    }
  }

  private stringifyKey(x: number, y: number) {
    return `${x.toFixed(0)}-${y.toFixed(0)}`;
  }

  private parseKey(key: string): [number, number] {
    const [x, y] = key.split('-');
    return [+x, +y];
  }

  async findAllAndTransform(
    applicationId: string,
    target_resolution: { width: number; height: number },
    event_type?: Event,
  ): Promise<{
    min: number;
    max: number;
    data: { x: number; y: number; value: number }[];
  }> {
    const trackerEvents = await this.TrackerEventModel.find({
      applicationId,
      'dimensions.event': event_type || 'mousemove',
      'dimensions.resolution': { $exists: true },
    }).exec();
    // transform trackerEvents coordinates to match the resolution of input

    const map = new Map<string, number>();
    const minMax = {
      min: 0,
      max: 0,
    };

    const length = trackerEvents.length;
    for (let i = 0; i < length; i++) {
      const event = trackerEvents[i];

      const { resolution } = event.dimensions;
      const { x, y } = event.dimensions.meta;

      const sourceAspectRatio = resolution.width / resolution.height;

      const targetAspectRatio =
        target_resolution.width / target_resolution.height;

      // si le ratio est le même, on peut directement convertir les coordonnées
      if (sourceAspectRatio === targetAspectRatio) {
        const key = this.stringifyKey(
          x * (target_resolution.width / resolution.width),
          y * (target_resolution.height / resolution.height),
        );

        this.addToMap(map, key, minMax);
      }

      // si le ratio target est plus grand que le ratio source il faut cropper la résolution source
      if (sourceAspectRatio > targetAspectRatio) {
        const croppedWidth = resolution.height * targetAspectRatio;
        const key = this.stringifyKey(
          x * (croppedWidth / resolution.width),
          y * (target_resolution.height / resolution.height),
        );

        this.addToMap(map, key, minMax);
      }

      // si le ratio target est plus petit que le ratio source il faut paddé la résolution source
      if (sourceAspectRatio < targetAspectRatio) {
        const paddedHeight = resolution.width / targetAspectRatio;
        const key = this.stringifyKey(
          x * (target_resolution.width / resolution.width),
          y * (paddedHeight / resolution.height),
        );

        this.addToMap(map, key, minMax);
      }
    }

    // transform map to json object
    return {
      ...minMax,
      data: Array.from(map.entries()).map(([key, value]) => {
        const parsedKey = this.parseKey(key);
        return {
          x: +parsedKey[0],
          y: +parsedKey[1],
          value,
        };
      }),
    };
  }
}
