// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  DeleteAgencyRequestBodyType,
  DeleteAgencyResponseData,
} from 'src/@types/opportunity/agency/deleteAgencyData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { DeleteAgency } from 'src/_requests/opportunity/agency';

export function useDeleteAgencyMutation(
  options?: UseMutationOptions<DeleteAgencyResponseData, ErrorResponse, DeleteAgencyRequestBodyType>
) {
  return useMutation<DeleteAgencyResponseData, ErrorResponse, DeleteAgencyRequestBodyType>(
    (data: DeleteAgencyRequestBodyType) => DeleteAgency(data),
    options
  );
}
