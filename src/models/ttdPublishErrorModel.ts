import mongoose from "mongoose";
import { TtdPublished, TtdPublishedSchema } from "./ttdPublishedModel";

export const TtdPublishErrorModel = mongoose.model<TtdPublished>(
  "ttd_publish_error",
  TtdPublishedSchema,
  "ttd_publish_error"
);
