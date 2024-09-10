import express from "express";
import { publisherJob } from "../services/cronJobs/publisherJob";

const router = express.Router();

router.get("/start", async (req, res) => {
  console.log("starting ttd-processor");
  publisherJob.start();
  console.log("ttd-processor started");
  res.status(200).json({ message: "ttd-processor started successfully" });
});

router.get("/stop", async (req, res) => {
  console.log("stopping ttd-processor");
  publisherJob.stop();
  console.log("ttd-processor stopped");
  res.status(200).json({ message: "ttd-processor stopped successfully" });
});

export { router as TtdPublisher };
