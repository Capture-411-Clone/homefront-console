/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { GetSiteInfoResponseType } from 'src/@types/opportunity/site-info/getSiteInfoData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import QuerySiteInfo from 'src/_requests/opportunity/site-info/querySiteInfo';

export function useSiteInfoQuery(
  queryFnArgs?: any,
  options?: UseQueryOptions<GetSiteInfoResponseType, ErrorResponse>
) {
  const queryKey = ['siteInfoQuery', JSON.stringify(queryFnArgs)];

  return useQuery<GetSiteInfoResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<GetSiteInfoResponseType> => QuerySiteInfo(),
    options
  );
}
