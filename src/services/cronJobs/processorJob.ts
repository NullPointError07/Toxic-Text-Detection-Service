import { CronJob } from "cron";
import { processQueue } from "../processQueue";

let isProcessorBusy = false;
// define ttd-prcessor-job
export const processorJob = CronJob.from({
  cronTime: "* * * * *",
  onTick: async function () {
    console.log("+---------------- PROCESSOR-JOB AWAKE ---------------+");
    if (!isProcessorBusy) {
      console.log("| Processor is free, take action");
      isProcessorBusy = true;
      try {
        console.log("| About to start processing, processor is flagged as busy");
        await processQueue();
      } catch (error) {
        console.log("| An error occurred while processing");
      } finally {
        isProcessorBusy = false;
        console.log("| Processor is flagged as free, waiting for next tick....");
      }
      console.log("+---------------- END -----------------+\n\n");
    } else {
      console.log("| Processor is busy, skipping this tick");
      console.log("+---------------- END -----------------+\n\n");
    }
  },
  start: false,
});
