/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  OfficesQueryFiltersType,
  QueryOfficesResponseBodyType,
} from 'src/@types/opportunity/office/queryOfficesData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { QueryOffices } from 'src/_requests/opportunity/office';

type queryOfficesType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: OfficesQueryFiltersType;
};

export function useOfficesQuery(
  queryFnArgs: queryOfficesType,
  options?: UseQueryOptions<QueryOfficesResponseBodyType, ErrorResponse>
) {
  const queryKey = ['OfficesQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryOfficesResponseBodyType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryOfficesResponseBodyType> =>
      QueryOffices(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as OfficesQueryFiltersType)
      ),
    options
  );
}
