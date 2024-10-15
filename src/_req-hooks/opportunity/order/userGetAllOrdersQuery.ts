/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  OrdersQueryFiltersType,
  QueryOrdersResponseBodyType,
} from 'src/@types/opportunity/order/queryOrdersData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import GetAllOrders from 'src/_requests/opportunity/order/queryOrders';

type queryOrdersType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: OrdersQueryFiltersType;
};

export function useOrdersQuery(
  queryFnArgs: queryOrdersType,
  options?: UseQueryOptions<QueryOrdersResponseBodyType, ErrorResponse>
) {
  const queryKey = ['OrdersQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryOrdersResponseBodyType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryOrdersResponseBodyType> =>
      GetAllOrders(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as OrdersQueryFiltersType)
      ),
    options
  );
}
