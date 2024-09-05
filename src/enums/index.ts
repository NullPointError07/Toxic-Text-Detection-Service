export enum ItemTypes {
  POST = "POST",
  COMMENT = "COMMENT",
  COMMENT_REPLY = "COMMENT_REPLY",
  PRODUCT_REVIEW = "PRODUCT_REVIEW",
  CONTEST_UPLOAD = "CONTEST_UPLOAD",
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

export enum VulgarOrNonVulgar {
  VULGAR = "vulger",
  NON_VULGAR = "non-vulgar",
}

export enum Languages {
  BENGALI = "bn",
  ENGLISH = "en",
  BANGLISH = "en_bn",
  UNKNOWN = "unknown",
}
