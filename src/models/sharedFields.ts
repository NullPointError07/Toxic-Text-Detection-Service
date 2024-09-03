import mongoose, { Document, Schema } from "mongoose";
import { ItemTypes } from "../enums";

export interface SharedFields extends Document {
  item_id: mongoose.Types.ObjectId;
  item_type: ItemTypes;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export const SharedFieldsSchema: Schema = new Schema(
  {
    item_id: { type: Schema.Types.ObjectId, required: true, unique: true },
    item_type: { type: String, enum: Object.values(ItemTypes), required: true },
    title: { type: String, nullable: true },
    description: { type: String, nullable: true },
  },
  { timestamps: true }
);
