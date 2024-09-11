import { TtdPublishApiResponse } from "../models/ttdPublishApiResponse";
import { TtdPublishedModel } from "../models/ttdPublishedModel";
import { TtdQueueCompleted } from "../models/ttdQueueCompletedModel";

/**
 * @description: "This Function will move from Ttd completed to Ttd published"
 */
export async function onTtdPublishComplete(
  oldestUnPublishedDoc: TtdQueueCompleted,
  apiResponse: TtdPublishApiResponse
) {
  const { _id, publish_status, ...restDocument } = oldestUnPublishedDoc.toObject();

  const documentData = {
    ...restDocument,
    ttd_publisher_api_response: apiResponse,
  };

  console.log(`| Published ttd-results, item-id:${documentData.item_id}`);

  try {
    await TtdPublishedModel.create(documentData);

    console.log(`| Item has been moved from ttd-completed to ttd-published`);
  } catch (error) {
    console.log(`| Failed to move item from ttd-completed to ttd-published`, error);
    console.log("+------- END -------+");
  }
}
