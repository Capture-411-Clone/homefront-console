import { AxiosResponse } from 'axios';
import {
  NotificationsQueryFiltersType,
  QueryNotificationsResponseType,
} from 'src/@types/opportunity/notification/queryNotificationsData';

import { opportunity } from 'src/_clients';

export default async function QueryNotifications(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: NotificationsQueryFiltersType
): Promise<QueryNotificationsResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await opportunity.get<void, AxiosResponse<QueryNotificationsResponseType>>(
    '/api/v1/notifications',
    {
      params: {
        id,
        page,
        per_page,
        order,
        order_by,
        filters: JSON.stringify(filters),
      },
    }
  );

  return response.data;
}
