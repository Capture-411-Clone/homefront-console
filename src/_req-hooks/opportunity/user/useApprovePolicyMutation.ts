// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApprovePolicyResponseType } from 'src/@types/opportunity/user/approvePolicyData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import ApprovePolicy from 'src/_requests/opportunity/user/approvePolicy';

export function useApprovePolicyMutation(
  options?: UseMutationOptions<ApprovePolicyResponseType, ErrorResponse>
) {
  return useMutation<ApprovePolicyResponseType, ErrorResponse>(() => ApprovePolicy(), options);
}
