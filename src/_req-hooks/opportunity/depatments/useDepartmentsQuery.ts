/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  DepartmentsQueryFiltersType,
  QueryDepartmentResponseType,
} from 'src/@types/opportunity/department/queryDepartmentsData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { QueryDepartments } from 'src/_requests/opportunity/department';

type QueryDepartmentsType = {
  id?: string;
  page?: number;
  per_page?: number;
  order?: string;
  order_by?: string;
  filters?: DepartmentsQueryFiltersType;
};

export function useDepartmentsQuery(
  queryFnArgs: QueryDepartmentsType,
  options?: UseQueryOptions<QueryDepartmentResponseType, ErrorResponse>
) {
  const queryKey = ['QueryDepartmentsQuery', JSON.stringify(queryFnArgs)];

  return useQuery<QueryDepartmentResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryDepartmentResponseType> =>
      QueryDepartments(
        queryFnArgs.id || '',
        queryFnArgs.page || 1,
        queryFnArgs.per_page || 10000,
        queryFnArgs.order || 'desc',
        queryFnArgs.order_by || 'id',
        queryFnArgs.filters || ({} as DepartmentsQueryFiltersType)
      ),
    options
  );
}
