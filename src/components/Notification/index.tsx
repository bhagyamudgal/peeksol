import React from "react";

export type NotificationType = "success" | "warning" | "error";

export interface NotificationProps {
	type: NotificationType;
	message: string;
}

export default function Notification({ type, message }: NotificationProps) {
	let bgColor: "bg-success" | "bg-warning" | "bg-error" = "bg-success";

	if (type === "warning") {
		bgColor = "bg-warning";
	}

	if (type === "error") {
		bgColor = "bg-error";
	}

	return <div className={`notification ${bgColor}`}>{message}</div>;
}
