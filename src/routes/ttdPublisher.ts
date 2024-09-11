import express from "express";
import { publisherJob } from "../services/cronJobs/publisherJob";

const router = express.Router();

router.get("/start", async (req, res) => {
  console.log("starting ttd-publisher");
  publisherJob.start();
  console.log("ttd-publisher started");
  res.status(200).json({ message: "ttd-publisher started successfully" });
});

router.get("/stop", async (req, res) => {
  console.log("stopping ttd-publisher");
  publisherJob.stop();
  console.log("ttd-publisher stopped");
  res.status(200).json({ message: "ttd-publisher stopped successfully" });
});

export { router as TtdPublisher };
