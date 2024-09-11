import { TtdPublishApiResponse } from "../models/ttdPublishApiResponse";
import { TtdPublishErrorModel } from "../models/ttdPublishErrorModel";
import { TtdQueueCompleted } from "../models/ttdQueueCompletedModel";

/**
 * @description: "This Function will handle error types and create error document in error collection according to type"
 */
export async function onTtdPublishError(
  oldestUnPublishedDoc: TtdQueueCompleted,
  apiResponse: TtdPublishApiResponse
) {
  const { _id, publish_status, ...restDocument } = oldestUnPublishedDoc.toObject();

  const documentData = {
    ...restDocument,
    ttd_publisher_api_response: apiResponse,
  };

  try {
    await TtdPublishErrorModel.create(documentData);
  } catch (error) {
    console.log(
      "| Failure to move from Gd Completed: From Gd Completed to GdPublishTimeout/GdPublishError",
      error
    );
    console.log("+------- END -------+");
  }
}
