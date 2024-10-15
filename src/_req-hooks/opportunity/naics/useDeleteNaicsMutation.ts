// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  DeleteNaicsRequestBodyType,
  DeleteNaicsResponseData,
} from 'src/@types/opportunity/naics/deleteNaicsData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { DeleteNaics } from 'src/_requests/opportunity/naics';

export function useDeleteNaicsMutation(
  options?: UseMutationOptions<DeleteNaicsResponseData, ErrorResponse, DeleteNaicsRequestBodyType>
) {
  return useMutation<DeleteNaicsResponseData, ErrorResponse, DeleteNaicsRequestBodyType>(
    (data: DeleteNaicsRequestBodyType) => DeleteNaics(data),
    options
  );
}
