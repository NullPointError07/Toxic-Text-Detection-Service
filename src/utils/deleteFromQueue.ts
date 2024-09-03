import { TtdQueueModel } from "../models/ttdQueueModel";

export async function deleteFromTtdQueue(_id: any) {
  try {
    await TtdQueueModel.findByIdAndDelete(_id);
  } catch (error) {
    console.log("| Failure to move Queue: At deleting from ttdQueue", error);
    console.log("+------- END -------+");
  }
}
