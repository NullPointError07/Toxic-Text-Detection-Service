import { OnCompleteStatus } from "../enums";
import { TtdQueue } from "../models/ttdQueueModel";
import { TtdResponseOk } from "../models/ttdProcessorResponseOk";
import { TtdQueueCompletedModel } from "../models/ttdQueueCompletedModel";

export async function onQueueComplete(oldestDocuemnt: TtdQueue, apiResponse: TtdResponseOk) {
  //console.log("api response from model....", apiResponse);

  const { _id, q_status, ...rest } = oldestDocuemnt.toObject();

  // console.log("what are rest doc w/o _id", rest);

  const completedData = {
    ...rest,
    ttd_processor_api_response: apiResponse,
    publish_status: OnCompleteStatus.UNPUBLISHED,
  };

  console.log("| Completed data: ", completedData);

  try {
    await TtdQueueCompletedModel.create(completedData);
  } catch (error) {
    console.log("| Failure to move Queue: From Queue to Invalid Video", error);
    console.log("+------- END -------+");
  }
}
