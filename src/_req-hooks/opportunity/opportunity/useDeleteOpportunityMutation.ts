// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  DeleteOpportunityRequestBodyType,
  DeleteOpportunityResponseType,
} from 'src/@types/opportunity/opportunity/deleteOpportunity';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { DeleteOpportunity } from 'src/_requests/opportunity/opportunity';

export function useDeleteOpportunityMutation(
  options?: UseMutationOptions<
    DeleteOpportunityResponseType,
    ErrorResponse,
    DeleteOpportunityRequestBodyType
  >
) {
  return useMutation<
    DeleteOpportunityResponseType,
    ErrorResponse,
    DeleteOpportunityRequestBodyType
  >((data: DeleteOpportunityRequestBodyType) => DeleteOpportunity(data), options);
}
