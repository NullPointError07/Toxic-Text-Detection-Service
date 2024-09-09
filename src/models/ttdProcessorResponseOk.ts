import { Schema } from "mongoose";
import { Languages, Message } from "../enums";

interface TextResponse {
  input: string;
  vulgar_words: string;
  msg: Message;
  vulgar_percentage: number;
  language: Languages;
}

export interface TtdResponseOk {
  status: 0 | 1;
  title: TextResponse;
  description: TextResponse;
}

const TextResponseSchema = new Schema(
  {
    input: { type: String, required: false },
    vulgar_words: { type: String, required: false },
    msg: {
      type: String,
      required: false,
      enum: Object.values(Message),
    },
    vulgar_percentage: { type: Number, required: false },
    language: { type: String, required: false, enum: Object.values(Languages) },
  },
  { _id: false }
);

export const TtdProcessorResponseOk: Schema = new Schema(
  {
    status: { type: Number, required: true },
    title: TextResponseSchema,
    description: TextResponseSchema,
  },
  { _id: false }
);
