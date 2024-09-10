import express from "express";
import { updateQueue } from "../services/updateQueue";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("+------------ UPDATING QUEUE-ITEM COMING THROUGH ---------+");

  await updateQueue(req, res);
});

export { router as TtdUpdateQueueRouter };
