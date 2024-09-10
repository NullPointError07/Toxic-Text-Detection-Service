import { Request, Response } from "express";
import { ItemTypes } from "../enums";
import { TtdQueueModel } from "../models/ttdQueueModel";

/**
 * @description: "This Function updates a new text in toxic text detection queue"
 */

export async function updateQueue(req: Request, res: Response) {
  console.log("+------------ NEW UPDATE QUEUE COMING THROUGH ---------+");
  console.log("| Payload data: ", req.body);

  const { item_id, item_type, title, description } = req.body;

  if (!Object.values(ItemTypes).includes(item_type)) {
    return res.status(400).json({ message: "Invalid item type" });
  }

  try {
    const updatedQueueItem = await TtdQueueModel.findOneAndUpdate(
      { item_id, item_type },
      { title, description },
      { new: true, upsert: true, runValidators: true }
    );

    if (updatedQueueItem) {
      console.log("| Queue item updated successfully");
      res.status(200).json({ status: 1, message: "Queue item updated successfully" });
    }

    console.log("+-------------- END -----------+");
  } catch (error) {
    console.log("| Queue Update FAILED");
    console.log("+-------------- END -----------+");
    res.status(500).json({
      status: 0,
      message: "Queue Set Failure",
      error: (error as Error).message,
    });
  }
}
