/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  AgenciesQueryFiltersType,
  QueryAgenciesResponseType,
} from 'src/@types/opportunity/agency/queryAgenciesData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { QueryAgencies } from 'src/_requests/opportunity/agency';

type QueryAgenciesType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: AgenciesQueryFiltersType;
};

export function useAgenciesQuery(
  queryFnArgs: QueryAgenciesType,
  options?: UseQueryOptions<QueryAgenciesResponseType, ErrorResponse>
) {
  const queryKey = ['AgenciesQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryAgenciesResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryAgenciesResponseType> =>
      QueryAgencies(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as AgenciesQueryFiltersType)
      ),
    options
  );
}
