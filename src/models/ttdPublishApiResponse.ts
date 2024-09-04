import { Schema } from "mongoose";

export interface TtdPublishApiResponse {
  status: 0 | 1;
  msg: String;
}

export const TtdPublishApiResponseSchema: Schema = new Schema(
  {
    status: { type: Number, required: true },
    msg: { type: String, required: true },
  },
  { _id: false }
);
