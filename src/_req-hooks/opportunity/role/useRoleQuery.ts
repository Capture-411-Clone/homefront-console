/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryRolesResponseType } from 'src/@types/opportunity/role/queryRoleData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import QueryRoles from 'src/_requests/opportunity/role/queryRoles';

export function useRolesQuery(options?: UseQueryOptions<QueryRolesResponseType, ErrorResponse>) {
  const queryKey = ['RolesQuery'];

  return useQuery<QueryRolesResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryRolesResponseType> => QueryRoles(),
    options
  );
}
