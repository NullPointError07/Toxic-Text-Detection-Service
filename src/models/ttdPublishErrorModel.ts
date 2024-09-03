import mongoose from "mongoose";
import { TtdPublished, TtdPublishedSchema } from "./ttdPublishedModel";

export const GdPublishErrorModel = mongoose.model<TtdPublished>(
  "ttd_publish_error",
  TtdPublishedSchema,
  "ttdd_publish_error"
);
