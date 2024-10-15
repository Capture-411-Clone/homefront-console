// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  updateAddressRequestBodyType,
  updateAddressResponseType,
} from 'src/@types/opportunity/address/updateAddressData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { UpdateAddress } from 'src/_requests/opportunity/address';

export function useUpdateAddressMutation(
  options?: UseMutationOptions<
    updateAddressResponseType,
    ErrorResponse,
    updateAddressRequestBodyType
  >
) {
  return useMutation<updateAddressResponseType, ErrorResponse, updateAddressRequestBodyType>(
    (data: updateAddressRequestBodyType) => UpdateAddress(data),
    options
  );
}
