/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryEntitiesResponseType } from 'src/@types/opportunity/entity-hunt/queryEntities';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import QueryEntities from 'src/_requests/opportunity/entity-hunt/queryEntities';

type EntitiesQueryParamsType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  last_visited_id?: string;
  filename?: string;
  year?: string;
  solicitation_number?: string;
};

export function useEntitiesQuery(
  queryFnArgs: EntitiesQueryParamsType,
  options?: UseQueryOptions<QueryEntitiesResponseType, ErrorResponse>
) {
  const queryKey = ['getAllEntitiesQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryEntitiesResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryEntitiesResponseType> =>
      QueryEntities(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.last_visited_id || '',
        queryFnArgs.filename || '',
        queryFnArgs.year || '',
        queryFnArgs.solicitation_number || ''
      ),
    options
  );
}
