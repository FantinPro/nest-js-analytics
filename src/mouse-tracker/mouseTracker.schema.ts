import { Schema } from 'mongoose';

/**
 * Mongoose Profile Schema
 */
export const MouseTrackerSchema = new Schema({
  applicationId: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  resolution: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  timestamp: { type: Number, required: true },
  sessionId: { type: String, required: true },
});

export interface MouseTracker extends Document {
  readonly _id: Schema.Types.ObjectId;
  readonly applicationId: string;
  readonly x: number;
  readonly y: number;
  readonly resolution: {
    width: number;
    height: number;
  };
  readonly timestamp: number;
  readonly sessionId: string;
}
