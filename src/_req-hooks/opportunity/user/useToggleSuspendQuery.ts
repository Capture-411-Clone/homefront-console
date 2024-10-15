/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { ToggleSuspendResponseType } from 'src/@types/opportunity/user/toggleSuspend';
import { ToggleSuspend } from 'src/_requests/opportunity/user';

type toggleSuspendType = {
  id: string;
  // filters: NursesQueryAbsencesFilterType;
};

export function useToggleSuspendQuery(
  queryFnArgs: toggleSuspendType,
  options?: UseQueryOptions<ToggleSuspendResponseType, ErrorResponse>
) {
  const queryKey = ['ToggleSuspendQuery', JSON.stringify(queryFnArgs.id)];

  return useQuery<ToggleSuspendResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<ToggleSuspendResponseType> => ToggleSuspend(queryFnArgs.id),
    options
  );
}
