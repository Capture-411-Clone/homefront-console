// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdateAgencyRequestBodyType,
  UpdateAgencyResponseType,
} from 'src/@types/opportunity/agency/updateAgencyData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { UpdateAgency } from 'src/_requests/opportunity/agency';

export function useUpdateAgencyMutation(
  options?: UseMutationOptions<UpdateAgencyResponseType, ErrorResponse, UpdateAgencyRequestBodyType>
) {
  return useMutation<UpdateAgencyResponseType, ErrorResponse, UpdateAgencyRequestBodyType>(
    (data: UpdateAgencyRequestBodyType) => UpdateAgency(data),
    options
  );
}
