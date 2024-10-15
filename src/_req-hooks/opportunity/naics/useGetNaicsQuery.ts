/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  NaicsQueryFiltersType,
  QueryNaicsResponseType,
} from 'src/@types/opportunity/naics/queryNaicsData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { QueryNaics } from 'src/_requests/opportunity/naics';

type getNaicsType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: NaicsQueryFiltersType;
};

export function useNaicsQuery(
  queryFnArgs: getNaicsType,
  options?: UseQueryOptions<QueryNaicsResponseType, ErrorResponse>
) {
  const queryKey = ['NaicsQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryNaicsResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryNaicsResponseType> =>
      QueryNaics(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as NaicsQueryFiltersType)
      ),
    options
  );
}
