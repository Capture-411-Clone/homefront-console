/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  QuerySetAsideResponseType,
  SetAsideQueryFiltersType,
} from 'src/@types/opportunity/set-aside/querySetAsideData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { QuerySetAside } from 'src/_requests/opportunity/set-aside';

type QuerySetAsideType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: SetAsideQueryFiltersType;
};

export function useSetAsideQuery(
  queryFnArgs: QuerySetAsideType,
  options?: UseQueryOptions<QuerySetAsideResponseType, ErrorResponse>
) {
  const queryKey = ['setAsideQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QuerySetAsideResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QuerySetAsideResponseType> =>
      QuerySetAside(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as SetAsideQueryFiltersType)
      ),
    options
  );
}
