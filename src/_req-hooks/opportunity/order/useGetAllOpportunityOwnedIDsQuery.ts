/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryAllOpportunityOwnedIDsResponseType } from 'src/@types/opportunity/order/queryAllOpportunityOwnedIDs';

import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import queryAllOpportunityOwnedIDs from 'src/_requests/opportunity/order/queryAllOpportunityOwnedIDs';

export function useGetAllOpportunityOwnedIDsQuery(
  options?: UseQueryOptions<QueryAllOpportunityOwnedIDsResponseType, ErrorResponse>
) {
  const queryKey = ['GetAllOpportunityOwnedIDsQuery'];

  return useQuery<QueryAllOpportunityOwnedIDsResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<QueryAllOpportunityOwnedIDsResponseType> => queryAllOpportunityOwnedIDs(),
    options
  );
}
