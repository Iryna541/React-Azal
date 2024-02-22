import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";

export function showSuccessNotification(message: string) {
  return notifications.show({
    color: "hsl(var(--primary))",
    icon: React.createElement(IconCheck, {}),
    title: "Success",
    message: message,
  });
}

export function showErrorNotification(message: string) {
  return notifications.show({
    color: "hsl(var(--destructive))",
    icon: React.createElement(IconX, {}),
    title: "Something went wrong",
    message: message,
  });
}
