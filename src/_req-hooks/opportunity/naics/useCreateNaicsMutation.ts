// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateNaicsRequestBodyType,
  CreateNaicsResponseType,
} from 'src/@types/opportunity/naics/createNaicsData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { CreateNaics } from 'src/_requests/opportunity/naics';

// type CreateCategoryMutationType = {
//   requestBody: CreateCategoryRequestType;
// };

export function useCreateNaicsMutation(
  options?: UseMutationOptions<CreateNaicsResponseType, ErrorResponse, CreateNaicsRequestBodyType>
) {
  return useMutation<CreateNaicsResponseType, ErrorResponse, CreateNaicsRequestBodyType>(
    (data: CreateNaicsRequestBodyType) => CreateNaics(data),
    options
  );
}
