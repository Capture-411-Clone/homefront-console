/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  QueryContractVehiclesResponseType,
  ContractVehiclesQueryFiltersType,
} from 'src/@types/opportunity/contract-vehicles/queyContractVehiclesData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { QueryVehicles as QueryContractVehicles } from 'src/_requests/opportunity/contractVehicles';

type QueryVehiclesType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: ContractVehiclesQueryFiltersType;
};

export function useContractVehiclesQuery(
  queryFnArgs: QueryVehiclesType,
  options?: UseQueryOptions<QueryContractVehiclesResponseType, ErrorResponse>
) {
  const queryKey = ['VehiclesQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryContractVehiclesResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryContractVehiclesResponseType> =>
      QueryContractVehicles(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as ContractVehiclesQueryFiltersType)
      ),
    options
  );
}
