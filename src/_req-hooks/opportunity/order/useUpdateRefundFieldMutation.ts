// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdateRefundFieldRequestBodyType,
  UpdateRefundFieldResponseType,
} from 'src/@types/opportunity/order/updateRefundFieldData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import UpdateRefundField from 'src/_requests/opportunity/order/updateRefundField';

export function useUpdateRefundFieldMutation(
  options?: UseMutationOptions<
    UpdateRefundFieldResponseType,
    ErrorResponse,
    UpdateRefundFieldRequestBodyType
  >
) {
  return useMutation<
    UpdateRefundFieldResponseType,
    ErrorResponse,
    UpdateRefundFieldRequestBodyType
  >((data: UpdateRefundFieldRequestBodyType) => UpdateRefundField(data), options);
}
