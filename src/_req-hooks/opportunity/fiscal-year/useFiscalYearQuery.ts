/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  FiscalYearsQueryFiltersType,
  QueryFiscalYearResponseType,
} from 'src/@types/opportunity/fiscal-year/queryFiscalYearData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { QueryFiscalYear } from 'src/_requests/opportunity/fiscal-year';

type getFiscalYearType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: FiscalYearsQueryFiltersType;
};

export function useFiscalYearQuery(
  queryFnArgs: getFiscalYearType,
  options?: UseQueryOptions<QueryFiscalYearResponseType, ErrorResponse>
) {
  const queryKey = ['FiscalYearQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryFiscalYearResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryFiscalYearResponseType> =>
      QueryFiscalYear(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as FiscalYearsQueryFiltersType)
      ),
    options
  );
}
