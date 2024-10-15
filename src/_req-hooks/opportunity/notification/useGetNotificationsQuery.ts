/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  NotificationsQueryFiltersType,
  QueryNotificationsResponseType,
} from 'src/@types/opportunity/notification/queryNotificationsData';

import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import QueryNotifications from 'src/_requests/opportunity/notification/queryNotifications';

type getNotificationType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: NotificationsQueryFiltersType;
};

export function useNotificationsQuery(
  queryFnArgs: getNotificationType,
  options?: UseQueryOptions<QueryNotificationsResponseType, ErrorResponse>
) {
  const queryKey = ['NotificationQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryNotificationsResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryNotificationsResponseType> =>
      QueryNotifications(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as NotificationsQueryFiltersType)
      ),
    options
  );
}
