import axios from "axios";
import { TtdQueueModel } from "../models/ttdQueueModel";
import { ToxicTextDetectionApi } from "../utils/apuUrls";
import { updateQueueStatus } from "../utils/updateQueueStatus";
import { onQueueError } from "./onQueueError";
import { onQueueComplete } from "./onQueueComplete";

/**
 * @description: "This function will process the video send request in ai model and save the response according response status"
 */
export async function processQueue() {
  try {
    console.log(`+------------------ QUEUE PROCESSOR STARTED AT ${new Date()} ----------------------+`);
    // console.log("| Fetching oldest item in ttd-queue");
    const oldestDocuemnt = await TtdQueueModel.findOne({
      q_status: "pending",
    }).exec();

    if (!oldestDocuemnt) {
      console.log("+--------- ttd-queue empty, terminating process ---------+");
      return "Cannot find any document, Collection Is Empty";
    }

    // console.log("| Oldest item has been fetched from ttd-queue");
    // console.log("oldes doc", oldestDocuemnt);

    const { _id, title, description } = oldestDocuemnt;

    console.log("| Updating q_status to 'in-progress'");
    await updateQueueStatus(_id);
    console.log("| q_status updated, processor is busy now");

    let response;

    // console.log("| Invoking ttd-micro-service-toxic-text-processor API");
    // console.log(`| => API URL: ${ToxicTextDetectionApi}`);

    try {
      response = await axios.post(ToxicTextDetectionApi, {
        title,
        description,
      });
      console.log("response from ttd model", response);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("| What is the type of Axios Error", error.code);
        if (error.code === "ECONNABORTED") {
          response = {
            data: {
              status: 0,
              error_type: "timeout",
              detail: "ECONNABORTED",
            },
          };
        } else if (error.code === "ECONNREFUSED") {
          response = {
            data: {
              status: 0,
              error_type: "timeout",
              detail: "ECONNREFUSED",
            },
          };
        }
      } else {
        response = {
          data: {
            status: 0,
            error_type: "error",
            detail: "An unexpected axios error occured",
          },
        };
        console.log("| An unexpected axios error occured");
      }
    }

    // console.log(
    //   "| ttd-micro-service-toxic-text-processor sent output",
    //   response?.data
    // );

    switch (response?.data.status) {
      case 0:
        await onQueueError(oldestDocuemnt, response?.data);
        break;
      case 1:
        await onQueueComplete(oldestDocuemnt, response?.data);
        break;
      default:
        console.error("Unknown status type:", response?.data.status);
    }

    console.log("+-------------- Processing Complete -----------+\n\n\n\n");
  } catch (error) {
    console.log("| An Error Occured At Process Queue", error);
    console.log("+------- END -------+");
  }
}
