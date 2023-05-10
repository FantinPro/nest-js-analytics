import { Schema } from 'mongoose';

/**
 * Mongoose Profile Schemae
 */
export const TrackerEventSchema = new Schema({
  applicationId: { type: String, required: true },
  timestamp: { type: Number, required: true },
  sessionId: { type: String, required: true },
  visitorId: { type: String, required: true },
  labelService: { type: String, required: true },
  dimensions: {
    type: {
      route: { type: String },
      resolution: {
        type: {
          width: { type: Number },
          height: { type: Number },
        },
      },
      tag: { type: String },
      event: { type: String },
      meta: { type: Schema.Types.Mixed },
    },
    default: {},
  },
});

export interface TrackerEvent extends Document {
  readonly _id: Schema.Types.ObjectId;
  readonly applicationId: string;
  readonly timestamp: number;
  readonly sessionId: string;
  readonly visitorId: string;
  readonly dimensions?: {
    readonly route?: string;
    readonly resolution?: {
      width: number;
      height: number;
    };
    readonly tag?: string;
    readonly event?: string;
    readonly meta?: Record<string, any>;
    [key: string]: any;
  };
}
