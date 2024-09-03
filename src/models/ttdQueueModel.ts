import mongoose, { Schema } from "mongoose";
import { QueueStatus } from "../enums";
import { SharedFields, SharedFieldsSchema } from "./sharedFields";

export interface TtdQueue extends SharedFields {
  q_status: QueueStatus;
}

const TtdQueueSchema: Schema = new Schema(
  {
    ...SharedFieldsSchema.obj,
    q_status: {
      type: String,
      enum: Object.values(QueueStatus),
      default: QueueStatus.PENDING,
    },
  },
  { timestamps: true }
);

export const TtdQueueModel = mongoose.model<TtdQueue>(
  "ttd-queue",
  TtdQueueSchema,
  "ttd-queue"
);
