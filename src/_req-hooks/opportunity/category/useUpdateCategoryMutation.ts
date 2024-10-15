// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdateCategoryRequestBodyType,
  UpdateCategoryResponseType,
} from 'src/@types/opportunity/category/updateCategory';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { UpdateCategory } from 'src/_requests/opportunity/category';

export function useUpdateCategoryMutation(
  options?: UseMutationOptions<
    UpdateCategoryResponseType,
    ErrorResponse,
    UpdateCategoryRequestBodyType
  >
) {
  return useMutation<UpdateCategoryResponseType, ErrorResponse, UpdateCategoryRequestBodyType>(
    (data: UpdateCategoryRequestBodyType) => UpdateCategory(data),
    options
  );
}
