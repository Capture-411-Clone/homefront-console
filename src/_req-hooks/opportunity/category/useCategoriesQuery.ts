/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  CategoriesQueryFiltersType,
  QueryCategoriesResponseType,
} from 'src/@types/opportunity/category/queryCategories';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import QueryCategories from 'src/_requests/opportunity/category/queryCategories';

type CategoriesQueryParamsType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: CategoriesQueryFiltersType;
};

export function useCategoriesQuery(
  queryFnArgs: CategoriesQueryParamsType,
  options?: UseQueryOptions<QueryCategoriesResponseType, ErrorResponse>
) {
  const queryKey = ['getAllCategoriesQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryCategoriesResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryCategoriesResponseType> =>
      QueryCategories(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as CategoriesQueryFiltersType)
      ),
    options
  );
}
