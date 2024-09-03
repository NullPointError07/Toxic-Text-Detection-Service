import { QueueStatus } from "../enums";
import { TtdQueueModel } from "../models/ttdQueueModel";

export async function updateQueueStatus(_id: any) {
  try {
    await TtdQueueModel.findByIdAndUpdate(_id, {
      q_status: QueueStatus.IN_PROGRESS,
    });
  } catch (error) {
    console.log("| Failed to update queue status", error);
    console.log("+------- END -------+");
  }
}
