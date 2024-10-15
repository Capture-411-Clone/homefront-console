// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdateOpportunityRequestBodyType,
  UpdateOpportunityResponseType,
} from 'src/@types/opportunity/opportunity/updateOpportunityData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { UpdateOpportunity } from 'src/_requests/opportunity/opportunity';

export function useUpdateOpportunityMutation(
  options?: UseMutationOptions<
    UpdateOpportunityResponseType,
    ErrorResponse,
    UpdateOpportunityRequestBodyType
  >
) {
  return useMutation<
    UpdateOpportunityResponseType,
    ErrorResponse,
    UpdateOpportunityRequestBodyType
  >((data: UpdateOpportunityRequestBodyType) => UpdateOpportunity(data), options);
}
