import express from "express";
import { postQueue } from "../services/postQueue";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("+------------ NEW QUEUE-ITEM COMING THROUGH ---------+");

  await postQueue(req, res);
});

export { router as TtdPostQueueRouter };
