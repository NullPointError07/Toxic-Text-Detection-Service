import { OnCompleteStatus } from "../enums";
import { TtdQueue } from "../models/ttdQueueModel";
import { deleteFromTtdQueue } from "../utils/deleteFromQueue";
import { TtdResponseOk } from "../models/ttdProcessorResponseOk";
import { TtdQueueCompletedModel } from "../models/ttdQueueCompletedModel";

export async function onQueueComplete(
  oldestDocuemnt: TtdQueue,
  apiResponse: TtdResponseOk
) {
  console.log("about to complete....", apiResponse);

  const { _id, q_status, ...rest } = oldestDocuemnt;

  try {
    await TtdQueueCompletedModel.create({
      rest,
      ttd_processor_api_response: apiResponse,
      publish_status: OnCompleteStatus.UNPUBLISHED,
    });

    await deleteFromTtdQueue(_id);
  } catch (error) {
    console.log("| Failure to move Queue: From Queue to Invalid Video", error);
    console.log("+------- END -------+");
  }
}
