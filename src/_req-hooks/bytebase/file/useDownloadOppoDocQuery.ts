/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { DownloadResponseType } from 'src/@types/bytebase/downloadOppoDoc';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { DownloadOpportunityDocument } from 'src/_requests/bytebase/file';

type DownloadQueryType = {
  key: string;
};

export function useDownloadOpportunityDocumentQuery(
  queryFnArgs: DownloadQueryType,
  options?: UseQueryOptions<DownloadResponseType, ErrorResponse>
) {
  const queryKey = ['DownloadQuery', JSON.stringify(queryFnArgs)];

  return useQuery<DownloadResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<DownloadResponseType> => DownloadOpportunityDocument(queryFnArgs.key),
    options
  );
}
