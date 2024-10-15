// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateSetAsideRequestBodyType,
  CreateSetAsideResponseType,
} from 'src/@types/opportunity/set-aside/createSetAsideData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { CreateSetAside } from 'src/_requests/opportunity/set-aside';

// type CreateCategoryMutationType = {
//   requestBody: CreateCategoryRequestType;
// };

export function useCreateSetAsideMutation(
  options?: UseMutationOptions<
    CreateSetAsideResponseType,
    ErrorResponse,
    CreateSetAsideRequestBodyType
  >
) {
  return useMutation<CreateSetAsideResponseType, ErrorResponse, CreateSetAsideRequestBodyType>(
    (data: CreateSetAsideRequestBodyType) => CreateSetAside(data),
    options
  );
}
