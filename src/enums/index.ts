export enum ItemTypes {
  POST = "POST",
  VIDEO = "VIDEO",
  PHOTO = "PHOTO",
  CONTEST = "CONTEST",
  VIDEO_COMMENT = "VIDEO_COMMENT",
  VIDEO_COMMENT_REPLY = "VIDEO_COMMENT_REPLY",
  POST_COMMENT = "POST_COMMENT",
  POST_COMMENT_REPLY = "POST_COMMENT_REPLY",
  PHOTO_COMMENT = "PHOTO_COMMENT",
  PHOTO_COMMENT_REPLY = "PHOTO_COMMENT_REPLY",
  PRODUCT_REVIEW = "PRODUCT_REVIEW",
  ORDER_NOTE = "ORDER_NOTE",
}

export enum QueueStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
}

export enum OnCompleteStatus {
  UNPUBLISHED = "unpublished",
  IN_PROGRESS = "in_progress",
}

export enum ErrorTypes {
  TIMEOUT = "timeout",
  INVALID = "invalid",
  ERROR = "error",
}

export enum Message {
  VULGAR = "vulgar",
  NON_VULGAR = "non-vulgar",
  NO_CONTENT = "no-content",
}

export enum Languages {
  BENGALI = "bn",
  ENGLISH = "en",
  BANGLISH = "bn_en",
  UNKNOWN = "Unknown",
}
