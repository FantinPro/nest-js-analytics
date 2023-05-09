import { Schema } from 'mongoose';

/**
 * Mongoose Profile Schema
 */
export const TrackerEventSchema = new Schema({
  applicationId: { type: String, required: true },
  timestamp: { type: Number, required: true },
  sessionId: { type: String, required: true },
  x: { type: Number, required: false },
  y: { type: Number, required: false },
  resolution: {
    type: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    required: false,
  },
  tag: { type: String, required: false },
  event: { type: String, required: false },
});

export interface TrackerEvent extends Document {
  readonly _id: Schema.Types.ObjectId;
  readonly applicationId: string;
  readonly timestamp: number;
  readonly sessionId: string;
  readonly x?: number;
  readonly y?: number;
  readonly resolution?: {
    width: number;
    height: number;
  };
  readonly tag?: string;
  readonly event?: string;
}
