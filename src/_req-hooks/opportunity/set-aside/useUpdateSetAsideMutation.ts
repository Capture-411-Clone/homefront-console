// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdateSetAsideRequestBodyType,
  UpdateSetAsideResponseType,
} from 'src/@types/opportunity/set-aside/updateSetAsideData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { UpdateSetAside } from 'src/_requests/opportunity/set-aside';

export function useUpdateSetAsideMutation(
  options?: UseMutationOptions<
    UpdateSetAsideResponseType,
    ErrorResponse,
    UpdateSetAsideRequestBodyType
  >
) {
  return useMutation<UpdateSetAsideResponseType, ErrorResponse, UpdateSetAsideRequestBodyType>(
    (data: UpdateSetAsideRequestBodyType) => UpdateSetAside(data),
    options
  );
}
