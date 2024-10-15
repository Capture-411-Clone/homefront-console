/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  QueryStaffReportResponseType,
  StaffReportQueryFiltersType,
} from 'src/@types/opportunity/opportunity/queryStaffReport';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import QueryStaffReport from 'src/_requests/opportunity/user/queryStaffReport';

type QueryStaffReportType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  query?: string;
  filters?: StaffReportQueryFiltersType;
};

export function useStaffReportQuery(
  queryFnArgs: QueryStaffReportType,
  options?: UseQueryOptions<QueryStaffReportResponseType, ErrorResponse>
) {
  const queryKey = ['StaffReportQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryStaffReportResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryStaffReportResponseType> =>
      QueryStaffReport(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.query || '',
        queryFnArgs.filters || ({} as StaffReportQueryFiltersType)
      ),
    options
  );
}
