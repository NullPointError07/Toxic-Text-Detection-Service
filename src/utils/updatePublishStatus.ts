import { OnCompleteStatus } from "../enums";
import { TtdQueueCompletedModel } from "../models/ttdQueueCompletedModel";

export async function updatePublishStatus(_id: any) {
  try {
    await TtdQueueCompletedModel.findByIdAndUpdate(_id, {
      publish_status: OnCompleteStatus.IN_PROGRESS,
    });
  } catch (error) {
    console.log("| Failed to update the published status");
    console.log("+------- END -------+");
  }
}
