/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  AddressesQueryFiltersType,
  QueryAddressesResponseType,
} from 'src/@types/opportunity/address/queryAddressesData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import QueryAddresses from 'src/_requests/opportunity/address/queryAddresses';

type AddressesQueryParamsType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: AddressesQueryFiltersType;
};

export function useAddressesQuery(
  queryFnArgs: AddressesQueryParamsType,
  options?: UseQueryOptions<QueryAddressesResponseType, ErrorResponse>
) {
  const queryKey = ['getAllAddressesQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryAddressesResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryAddressesResponseType> =>
      QueryAddresses(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as AddressesQueryFiltersType)
      ),
    options
  );
}
