import express from "express";
import { postQueue } from "../services/postQueue";
import { updateQueue } from "../services/updateQueue";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("+------------ NEW SET QUEUE REQUEST COMING THROUGH ---------+");
  const { isEdited } = req.body;

  if (isEdited) {
    await updateQueue(req, res);
  } else {
    await postQueue(req, res);
  }
});

export { router as TtdSetQueueRouter };
