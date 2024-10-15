// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdateNaicsRequestBodyType,
  UpdateNaicsResponseType,
} from 'src/@types/opportunity/naics/updateNaicsData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { UpdateNaics } from 'src/_requests/opportunity/naics';

export function useUpdateNaicsMutation(
  options?: UseMutationOptions<UpdateNaicsResponseType, ErrorResponse, UpdateNaicsRequestBodyType>
) {
  return useMutation<UpdateNaicsResponseType, ErrorResponse, UpdateNaicsRequestBodyType>(
    (data: UpdateNaicsRequestBodyType) => UpdateNaics(data),
    options
  );
}
