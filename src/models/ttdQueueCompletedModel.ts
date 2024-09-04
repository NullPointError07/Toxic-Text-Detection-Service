import mongoose, { Schema } from "mongoose";
import { OnCompleteStatus } from "../enums";
import { SharedFields, SharedFieldsSchema } from "./sharedFields";
import {
  TtdProcessorResponseOk,
  TtdResponseOk,
} from "./ttdProcessorResponseOk";

export interface TtdQueueCompleted extends SharedFields {
  ttd_processor_api_response: TtdResponseOk;
  publish_status: OnCompleteStatus;
}

const TtdQueueCompletedSchema: Schema = new Schema(
  {
    ...SharedFieldsSchema.obj,
    ttd_processor_api_response: {
      type: TtdProcessorResponseOk,
      required: true,
    },
    publish_status: {
      type: String,
      enum: Object.values(OnCompleteStatus),
      default: OnCompleteStatus.UNPUBLISHED,
    },
  },
  { timestamps: true }
);

export const TtdQueueCompletedModel = mongoose.model<TtdQueueCompleted>(
  "ttd_queue_completed",
  TtdQueueCompletedSchema,
  "ttd_queue_completed"
);
