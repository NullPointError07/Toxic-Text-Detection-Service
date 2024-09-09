import mongoose, { Schema } from "mongoose";
import { SharedFields, SharedFieldsSchema } from "./sharedFields";
import {
  TtdProcessorResponseOk,
  TtdResponseOk,
} from "./ttdProcessorResponseOk";

export interface TtdPublished extends SharedFields {
  ttd_processor_api_response: TtdResponseOk;
  ttd_publisher_api_response: Record<string, any>;
}

export const TtdPublishedSchema: Schema = new Schema(
  {
    ...SharedFieldsSchema.obj,
    item_id: { type: Schema.Types.ObjectId, required: true },
    ttd_processor_api_response: {
      type: TtdProcessorResponseOk,
      required: true,
    },
    ttd_publisher_api_response: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

export const TtdPublishedModel = mongoose.model<TtdPublished>(
  "ttd_published",
  TtdPublishedSchema,
  "ttd_published"
);
