import { ErrorTypes } from "../enums";
import { TtdResponseFail } from "../models/ttdProcessorResponseFail";
import {
  TtdQueueErrorModel,
  TtdQueueInvalidModel,
  TtdQueueTimeOutModel,
} from "../models/ttdQueueErrorTypesModel";
import { TtdQueue } from "../models/ttdQueueModel";

export async function onQueueError(oldestDocuemnt: TtdQueue, apiResponse: TtdResponseFail) {
  const { _id, q_status, ...rest } = oldestDocuemnt.toObject();

  const documentData = {
    ...rest,
    ttd_processor_api_response: apiResponse,
  };

  const { error_type } = apiResponse;
  console.log(`| Text processing error, type: ${error_type}`);
  console.log(`| Text processing error, data:`);
  console.log(documentData);
  try {
    switch (error_type) {
      case ErrorTypes.TIMEOUT:
        //console.log("timeout:", documentData);
        await TtdQueueTimeOutModel.create(documentData);
        console.log("| item has been moved to 'timeout' collection");
        break;
      case ErrorTypes.INVALID:
        //console.log("invalid....", documentData);
        await TtdQueueInvalidModel.create(documentData);
        console.log("| item has been moved to 'invalid' collection");
        break;
      case ErrorTypes.ERROR:
        //console.log("error....", documentData);
        await TtdQueueErrorModel.create(documentData);
        console.log("| item has been moved to 'error' collection");
        break;
      default:
        console.log("| Unknown error type:", error_type);
    }
  } catch (error) {
    console.log("| Failure to move queue-item from ttd_queue to ttd_timeout", error);
  }
}
