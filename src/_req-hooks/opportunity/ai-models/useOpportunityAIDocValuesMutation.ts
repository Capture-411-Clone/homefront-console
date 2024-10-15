// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  OpportunityAIDocValuesRequest,
  OpportunityAIDocValuesResponseType,
} from 'src/@types/opportunity/ai-models/opportunityAIDocValues';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import OpportunityAIDocValues from 'src/_requests/opportunity/ai-models/opportunityAIDocValues';

export function useOpportunityAIDocValuesMutation(
  options?: UseMutationOptions<
    OpportunityAIDocValuesResponseType,
    ErrorResponse,
    OpportunityAIDocValuesRequest
  >
) {
  return useMutation<
    OpportunityAIDocValuesResponseType,
    ErrorResponse,
    OpportunityAIDocValuesRequest
  >((data: OpportunityAIDocValuesRequest) => OpportunityAIDocValues(data), options);
}
