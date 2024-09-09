import mongoose, { Schema } from "mongoose";
import { SharedFields, SharedFieldsSchema } from "./sharedFields";

interface TtdQueueErrorTypes extends SharedFields {
  ttd_processor_api_response: Record<string, any>;
}

const TtdQueueErrorTypesSchema: Schema = new Schema(
  {
    ...SharedFieldsSchema.obj,
    item_id: { type: Schema.Types.ObjectId, required: true },
    video_processor_api_response: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

export const TtdQueueErrorModel = mongoose.model<TtdQueueErrorTypes>(
  "ttd_queue_error",
  TtdQueueErrorTypesSchema,
  "ttd_queue_error"
);

export const TtdQueueInvalidModel = mongoose.model<TtdQueueErrorTypes>(
  "ttd_queue_invalid",
  TtdQueueErrorTypesSchema,
  "ttd_queue_invalid"
);

export const TtdQueueTimeOutModel = mongoose.model<TtdQueueErrorTypes>(
  "ttd_queue_timeout",
  TtdQueueErrorTypesSchema,
  "ttd_queue_timeout"
);
