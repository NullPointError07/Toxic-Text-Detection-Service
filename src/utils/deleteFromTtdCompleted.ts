import { TtdQueueCompletedModel } from "../models/ttdQueueCompletedModel";

export async function deleteFromTtdCompleted(_id: any) {
  try {
    await TtdQueueCompletedModel.findByIdAndDelete(_id);
  } catch (error) {
    console.log("| Failed to delete from Ttd Completed", error);
    console.log("+------- END -------+");
  }
}
