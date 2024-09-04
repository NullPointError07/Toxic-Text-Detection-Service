import express from "express";
import { processorJob } from "../services/cronJobs/processorJob";

const router = express.Router();

router.post("/start", async (req, res) => {
  console.log("starting gd-processor");
  processorJob.start();
  console.log("gd-processor started");
  res.status(200).json({ message: "gd-processor started successfully" });
});

router.post("/stop", async (req, res) => {
  console.log("stopping gd-processor");
  processorJob.stop();
  console.log("gd-processor stopped");
  res.status(200).json({ message: "gd-processor stopped successfully" });
});

export { router as TtdProcessor };
