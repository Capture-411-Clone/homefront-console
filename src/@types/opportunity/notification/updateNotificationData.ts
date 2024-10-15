import { NotificationData } from './notificationData';

export type UpdateNotificationResponseType = {
  statusCode: number;
  data: NotificationData;
};

export type UpdateNotificationRequestBodyType = {
  seen: boolean;
  ID: number;
};
