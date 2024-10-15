/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ContributionStateResponseType as ContributionsStateResponseType } from 'src/@types/opportunity/opportunity/contributionsState';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import ContributionsState from 'src/_requests/opportunity/opportunity/contributionsState';

export function useContributionsStateQuery(
  options?: UseQueryOptions<ContributionsStateResponseType, ErrorResponse>
) {
  const queryKey = ['ContributionsStateQuery'];

  return useQuery<ContributionsStateResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<ContributionsStateResponseType> => ContributionsState(),
    options
  );
}
