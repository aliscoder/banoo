import { Label } from "../../../../components";

export function renderStatus(status: string) {
  switch (status) {
    case "approved":
      return <Label title="پذیرفته شده" type="success" />;
      break;
    case "pending":
      return <Label title="در انتظار پذیرش" type="warning" />;
      break;
    case "rejected":
      return <Label title="پذیرفته نشده" type="danger" />;
      break;
    case "cancelled":
      return <Label title="لغو شده" type="danger" />;
      break;
    case "completed":
      return <Label title="تکمیل شده" type="success" />;
      break;
    default:
      break;
  }
}
