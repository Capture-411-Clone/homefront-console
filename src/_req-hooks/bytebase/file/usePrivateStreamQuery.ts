/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { PrivateStreamResponseType } from 'src/@types/bytebase/privateStream';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { GetPrivateStream } from 'src/_requests/bytebase/file';

type PrivateStreamQueryType = {
  key: string;
};

export function usePrivateStreamQuery(
  queryFnArgs: PrivateStreamQueryType,
  options?: UseQueryOptions<PrivateStreamResponseType, ErrorResponse>
) {
  const queryKey = ['PrivateStreamQuery', JSON.stringify(queryFnArgs)];

  return useQuery<PrivateStreamResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<PrivateStreamResponseType> => GetPrivateStream(queryFnArgs.key),
    options
  );
}
