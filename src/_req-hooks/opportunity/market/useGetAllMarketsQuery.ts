/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  MarketsQueryFiltersType,
  QueryMarketsResponseBodyType,
} from 'src/@types/opportunity/market/queryMarketsData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { QueryMarkets } from 'src/_requests/opportunity/market';

type queryMarketsType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: MarketsQueryFiltersType;
};

export function useMarketsQuery(
  queryFnArgs: queryMarketsType,
  options?: UseQueryOptions<QueryMarketsResponseBodyType, ErrorResponse>
) {
  const queryKey = ['MarketsQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryMarketsResponseBodyType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryMarketsResponseBodyType> =>
      QueryMarkets(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as MarketsQueryFiltersType)
      ),
    options
  );
}
