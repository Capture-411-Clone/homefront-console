import { AxiosResponse } from 'axios';
import {
  UpdateNotificationRequestBodyType,
  UpdateNotificationResponseType,
} from 'src/@types/opportunity/notification/updateNotificationData';
import { opportunity } from 'src/_clients';

export default async function UpdateNotification({
  seen,
  ID,
}: UpdateNotificationRequestBodyType): Promise<UpdateNotificationResponseType> {
  const response = await opportunity.patch<
    UpdateNotificationRequestBodyType,
    AxiosResponse<UpdateNotificationResponseType>
  >(`/api/v1/notifications/${ID}`, { seen });

  return response.data;
}
