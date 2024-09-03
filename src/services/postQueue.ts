import { Request, Response } from "express";
import { ItemTypes } from "../enums";
import { TtdQueueModel } from "../models/ttdQueueModel";

/**
 * @description: "This Function sets a new text in toxic text detection queue"
 */

export async function postQueue(req: Request, res: Response) {
  console.log("| Payload data: ", req.body);
  const { item_type } = req.body;

  if (!Object.values(ItemTypes).includes(item_type)) {
    return res.status(400).json({ message: "Invalid item type" });
  }

  try {
    await TtdQueueModel.create(req.body);
    console.log("| Queue set successful");
    console.log("+-------------- END -----------+");
    res.status(201).json({ status: 1, message: "Queue Set Successfully" });
  } catch (error) {
    console.log("| Queue set FAILED");
    console.log("+-------------- END -----------+");
    res.status(500).json({
      status: 0,
      message: "Queue Set Failure",
      error: (error as Error).message,
    });
  }
}
