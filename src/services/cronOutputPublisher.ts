import axios from "axios";
import { OnCompleteStatus } from "../enums";
import { updatePublishStatus } from "../utils/updatePublishStatus";
import { onTtdPublishComplete } from "./onTtdPublishComplete";
import { onTtdPublishError } from "./onTtdPublishError";
import { TtdQueueCompletedModel } from "../models/ttdQueueCompletedModel";
import { ToxicTextPublicationApi } from "../utils/apuUrls";
import { deleteFromTtdCompleted } from "../utils/deleteFromTtdCompleted";

/**
 * @description: "This Function will publish a video to fanfare backend from Ttd Service(TtdCompleted)"
 */
export async function cronOutputPublisher() {
  console.log(`+------------------ TTD PUBLISHER STARTED AT ${new Date()} ------------------+`);
  try {
    console.log("| Fetching oldest unpublished item");
    const oldestUnPublishedDoc = await TtdQueueCompletedModel.findOne({
      publish_status: OnCompleteStatus.UNPUBLISHED,
    });

    if (!oldestUnPublishedDoc) {
      console.log("+-------- No item to publish --------+\n\n\n");
      return "Oldest UnpublishedDocument Not Found. Database might be empty";
    }
    console.log("| Oldest unpublished item is fetched:", oldestUnPublishedDoc);

    const { _id, item_id, item_type, ttd_processor_api_response } = oldestUnPublishedDoc;

    const publicationData = {
      item_id,
      item_type,
      ttdResults: ttd_processor_api_response,
    };

    console.log("| Updating publish_status to in_progress");
    await updatePublishStatus(_id);
    console.log("| Updated publish_status to in_progress, publisher is busy now");

    console.log("| Toxic Text Publication API: ", ToxicTextPublicationApi);
    console.log("| Invoking publication API with: ", publicationData);

    let response;
    try {
      response = await axios.post(ToxicTextPublicationApi, publicationData, {
        timeout: 50000,
      });
      console.log("| Publication API sent output: ", response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNREFUSED") {
          response = {
            data: {
              status: 0,
              msg: "ECONNREFUSED",
            },
          };
        } else if (error.code === "ECONNABORTED") {
          response = {
            data: {
              status: 0,
              msg: "ECONNABORTED",
            },
          };
        }
      } else {
        response = {
          data: {
            status: 0,
            msg: "An unknown error type Occured",
          },
        };
      }
    }

    switch (response?.data.status) {
      case 0:
        await onTtdPublishError(oldestUnPublishedDoc, response.data);
        break;
      case 1:
        await onTtdPublishComplete(oldestUnPublishedDoc, response.data);
        break;
      default:
        console.error("Unknown status type:", response?.data.status);
    }

    await deleteFromTtdCompleted(_id);
    console.log("+------ TTD Publisher Complete --------+\n\n\n");
  } catch (error) {
    console.log("| Failure At Publishig Cron", error);
    console.log("+------- END -------+");
  }
}
