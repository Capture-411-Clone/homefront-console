// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  OpportunityAIAllDocValuesRequest,
  OpportunityAIAllDocValuesResponseType,
} from 'src/@types/opportunity/ai-models/opportunityAIAllDocValues';

import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import OpportunityAIAllDocValues from 'src/_requests/opportunity/ai-models/opportunityAIAllDocValues';

export function useOpportunityAIAllDocValuesMutation(
  options?: UseMutationOptions<
    OpportunityAIAllDocValuesResponseType,
    ErrorResponse,
    OpportunityAIAllDocValuesRequest
  >
) {
  return useMutation<
    OpportunityAIAllDocValuesResponseType,
    ErrorResponse,
    OpportunityAIAllDocValuesRequest
  >((data: OpportunityAIAllDocValuesRequest) => OpportunityAIAllDocValues(data), options);
}
