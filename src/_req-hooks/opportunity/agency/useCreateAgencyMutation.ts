// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateAgencyRequestBodyType,
  CreateAgencyResponseType,
} from 'src/@types/opportunity/agency/createAgencyData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { CreateAgency } from 'src/_requests/opportunity/agency';

// type CreateCategoryMutationType = {
//   requestBody: CreateCategoryRequestType;
// };

export function useCreateAgencyMutation(
  options?: UseMutationOptions<CreateAgencyResponseType, ErrorResponse, CreateAgencyRequestBodyType>
) {
  return useMutation<CreateAgencyResponseType, ErrorResponse, CreateAgencyRequestBodyType>(
    (data: CreateAgencyRequestBodyType) => CreateAgency(data),
    options
  );
}
