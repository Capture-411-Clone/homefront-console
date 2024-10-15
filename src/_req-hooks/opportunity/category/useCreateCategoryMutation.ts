// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateCategoryRequestType,
  CreateCategoryResponseBodyType,
} from 'src/@types/opportunity/category/createCategory';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { CreateCategory } from 'src/_requests/opportunity/category';

// type CreateCategoryMutationType = {
//   requestBody: CreateCategoryRequestType;
// };

export function useCreateCategoryMutation(
  options?: UseMutationOptions<
    CreateCategoryResponseBodyType,
    ErrorResponse,
    CreateCategoryRequestType
  >
) {
  return useMutation<CreateCategoryResponseBodyType, ErrorResponse, CreateCategoryRequestType>(
    (data: CreateCategoryRequestType) => CreateCategory(data),
    options
  );
}
