// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  DeleteSetAsideRequestBodyData,
  DeleteSetAsideResponseData,
} from 'src/@types/opportunity/set-aside/deleteSetAsideData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { DeleteSetAside } from 'src/_requests/opportunity/set-aside';

export function useDeleteSetAsideMutation(
  options?: UseMutationOptions<
    DeleteSetAsideResponseData,
    ErrorResponse,
    DeleteSetAsideRequestBodyData
  >
) {
  return useMutation<DeleteSetAsideResponseData, ErrorResponse, DeleteSetAsideRequestBodyData>(
    (data: DeleteSetAsideRequestBodyData) => DeleteSetAside(data),
    options
  );
}
