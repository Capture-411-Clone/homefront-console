/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { ToggleOfficialResponseType } from 'src/@types/opportunity/user/toggleOfficial';
import { ToggleOfficial } from 'src/_requests/opportunity/user';

type toggleOfficialType = {
  id: string;
  // filters: NursesQueryAbsencesFilterType;
};

export function useToggleOfficialQuery(
  queryFnArgs: toggleOfficialType,
  options?: UseQueryOptions<ToggleOfficialResponseType, ErrorResponse>
) {
  const queryKey = ['ToggleOfficialQuery', JSON.stringify(queryFnArgs.id)];

  return useQuery<ToggleOfficialResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<ToggleOfficialResponseType> => ToggleOfficial(queryFnArgs.id),
    options
  );
}
