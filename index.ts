import express, { Request, Response } from "express";
import { connectDB } from "./src/db/connectDB";
import { TtdPostQueueRouter } from "./src/routes/ttdPostQueue";
import { TtdUpdateQueueRouter } from "./src/routes/ttdUpdateQueue";
import { TtdProcessor } from "./src/routes/ttdProcessor";
import { TtdPublisher } from "./src/routes/ttdPublisher";
import { TtdSetQueueRouter } from "./src/routes/ttdSetQueue";

const app = express();
app.use(express.json());

const port = 6969;

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Toxic Text Detection Service");
});

app.use("/ttd-set-queue", TtdSetQueueRouter);
app.use("/ttd-post-queue", TtdPostQueueRouter);
app.use("/ttd-update-queue", TtdUpdateQueueRouter);
app.use("/ttd-processor", TtdProcessor);
app.use("/ttd-publisher", TtdPublisher);

app.listen(port, () => {
  console.log(`Toxic Text Detection Micro Service has started on port http://localhost:${port}`);
});
