/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  OpportunitiesQueryFiltersType,
  QueryOpportunitiesResponseType,
} from 'src/@types/opportunity/opportunity/queryOpportunityData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { QueryOpportunity } from 'src/_requests/opportunity/opportunity';

type QueryOpportunityType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  mine_only?: string;
  my_pipeline?: string;
  query?: string;
  filters?: OpportunitiesQueryFiltersType;
};

export function useOpportunityQuery(
  queryFnArgs: QueryOpportunityType,
  options?: UseQueryOptions<QueryOpportunitiesResponseType, ErrorResponse>
) {
  const queryKey = ['OpportunityQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryOpportunitiesResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryOpportunitiesResponseType> =>
      QueryOpportunity(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.query || '',
        queryFnArgs.mine_only || 'false',
        queryFnArgs.my_pipeline || 'false',
        queryFnArgs.filters || ({} as OpportunitiesQueryFiltersType)
      ),
    options
  );
}
