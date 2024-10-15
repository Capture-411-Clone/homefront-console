import { FilterValueString } from 'src/@types/site/filters';
import { NotificationData } from './notificationData';

export type NotificationsQueryFiltersType = {
  driver?: FilterValueString;
  seen?: FilterValueString;
  sender_user_id?: FilterValueString;
  target_user_id?: FilterValueString;
  created_at?: FilterValueString;
  subject?: FilterValueString;
  recipient?: FilterValueString;
  body?: FilterValueString;
};

export type QueryNotificationsResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: NotificationData[];
  };
};
