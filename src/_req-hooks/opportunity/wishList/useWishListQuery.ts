/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  QueryWishListResponseType,
  WishListQueryFiltersType,
} from 'src/@types/opportunity/wish-list/queryWishListData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { QueryWishList } from 'src/_requests/opportunity/wishList';

type QueryWishListType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: WishListQueryFiltersType;
};

export function useWishListQuery(
  queryFnArgs: QueryWishListType,
  options?: UseQueryOptions<QueryWishListResponseType, ErrorResponse>
) {
  const queryKey = ['WishListQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryWishListResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryWishListResponseType> =>
      QueryWishList(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as WishListQueryFiltersType)
      ),
    options
  );
}
