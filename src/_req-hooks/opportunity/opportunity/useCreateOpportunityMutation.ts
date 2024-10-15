// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateOpportunityRequestBodyType,
  CreateOpportunityResponseType,
} from 'src/@types/opportunity/opportunity/createOpportunityData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { CreateOpportunity } from 'src/_requests/opportunity/opportunity';

export function useCreateOpportunityMutation(
  options?: UseMutationOptions<
    CreateOpportunityResponseType,
    ErrorResponse,
    CreateOpportunityRequestBodyType
  >
) {
  return useMutation<
    CreateOpportunityResponseType,
    ErrorResponse,
    CreateOpportunityRequestBodyType
  >((data: CreateOpportunityRequestBodyType) => CreateOpportunity(data), options);
}
