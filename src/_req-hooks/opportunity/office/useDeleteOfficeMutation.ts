// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  DeleteOfficesRequestBodyData,
  DeleteOfficesResponseData,
} from 'src/@types/opportunity/office/deleteOfficesData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { DeleteOffices } from 'src/_requests/opportunity/office';

export function useDeleteOfficesMutation(
  options?: UseMutationOptions<
    DeleteOfficesResponseData,
    ErrorResponse,
    DeleteOfficesRequestBodyData
  >
) {
  return useMutation<DeleteOfficesResponseData, ErrorResponse, DeleteOfficesRequestBodyData>(
    (data: DeleteOfficesRequestBodyData) => DeleteOffices(data),
    options
  );
}
