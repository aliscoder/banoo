import { AppStatusType } from "@types";

export default function getStatusColor(status: AppStatusType) {
  switch (status) {
    case "approved":
      return "success";
      break;
    case "rejected":
      return "danger";
      break;
    case "cancelled":
      return "danger";
      break;
    case "pending":
      return "info";
      break;
    case "completed":
      return "success";
      break;
    default:
      return "info";
      break;
  }
}

export function getStatusName(status: AppStatusType) {
  switch (status) {
    case "approved":
      return "پذیرفته شده";
      break;
    case "rejected":
      return "رد شده";
      break;
    case "cancelled":
      return "لغو شده";
      break;
    case "pending":
      return "در انتظار تایید";
      break;
    case "completed":
      return "تمام شده";
      break;
    default:
      return "info";
      break;
  }
}
