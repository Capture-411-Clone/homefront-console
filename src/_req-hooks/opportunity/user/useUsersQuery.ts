/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { GetAllUsers } from 'src/_requests/opportunity/user';
import {
  QueryUsersResponseType,
  UsersQueryFiltersType,
} from 'src/@types/opportunity/user/queryUsersData';

type QueryUsersType = {
  id?: string;
  page?: number;
  per_page?: number;
  query?: string;
  order?: string;
  order_by?: string;
  filters?: UsersQueryFiltersType;
};

export function useUsersQuery(
  queryFnArgs: QueryUsersType,
  options?: UseQueryOptions<QueryUsersResponseType, ErrorResponse>
) {
  const queryKey = ['getAllUsersQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryUsersResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryUsersResponseType> =>
      GetAllUsers(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.query || '',
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as UsersQueryFiltersType)
      ),
    options
  );
}
