// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  deleteAddressesRequestBodyType,
  deleteAddressesResponseType,
} from 'src/@types/opportunity/address/deleteAddressesData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { DeleteAddresses } from 'src/_requests/opportunity/address';

export function useDeleteAddressesMutation(
  options?: UseMutationOptions<
    deleteAddressesResponseType,
    ErrorResponse,
    deleteAddressesRequestBodyType
  >
) {
  return useMutation<deleteAddressesResponseType, ErrorResponse, deleteAddressesRequestBodyType>(
    (data: deleteAddressesRequestBodyType) => DeleteAddresses(data),
    options
  );
}
