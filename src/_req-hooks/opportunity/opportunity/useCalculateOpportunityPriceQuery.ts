/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { CalculateOpportunityPriceResponseType } from 'src/@types/opportunity/opportunity/calculateOpportunityPrice';

import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import CalculateOpportunityPrice from 'src/_requests/opportunity/opportunity/calculateOpportunityPrice';

type CalculateOpportunityPriceQueryType = {
  id: number;
};

export function useCalculateOpportunityPriceQuery(
  queryFnArgs: CalculateOpportunityPriceQueryType,
  options?: UseQueryOptions<CalculateOpportunityPriceResponseType, ErrorResponse>
) {
  const queryKey = ['CalculateOpportunityPriceQuery', JSON.stringify(queryFnArgs)];

  return useQuery<CalculateOpportunityPriceResponseType, ErrorResponse>(
    queryKey,
    async (): Promise<CalculateOpportunityPriceResponseType> =>
      CalculateOpportunityPrice({ ID: queryFnArgs.id }),
    options
  );
}
