// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateAddressRequestBodyType,
  CreateAddressResponseType,
} from 'src/@types/opportunity/address/createAddressData';

import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { CreateAddress } from 'src/_requests/opportunity/address';

export function useCreateAddressMutation(
  options?: UseMutationOptions<
    CreateAddressResponseType,
    ErrorResponse,
    CreateAddressRequestBodyType
  >
) {
  return useMutation<CreateAddressResponseType, ErrorResponse, CreateAddressRequestBodyType>(
    (data: CreateAddressRequestBodyType) => CreateAddress(data),
    options
  );
}
