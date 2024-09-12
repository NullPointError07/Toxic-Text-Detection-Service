import { CronJob } from "cron";
import { cronOutputPublisher } from "../cronOutputPublisher";

export const publisherJob = CronJob.from({
  cronTime: "*/30 * * * * *",
  onTick: function () {
    cronOutputPublisher();
  },
  start: false,
});
