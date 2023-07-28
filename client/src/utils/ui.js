import { notification } from "antd";

export function openNotification(type, message, description) {
  notification[type]({
    message: message,
    description: description,
  });
}
