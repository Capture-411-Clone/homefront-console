// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  DeleteCategoriesRequestBodyData,
  DeleteCategoriesResponseData,
} from 'src/@types/opportunity/category/deleteCategories';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { DeleteCategories } from 'src/_requests/opportunity/category';

export function useDeleteCategoriesMutation(
  options?: UseMutationOptions<
    DeleteCategoriesResponseData,
    ErrorResponse,
    DeleteCategoriesRequestBodyData
  >
) {
  return useMutation<DeleteCategoriesResponseData, ErrorResponse, DeleteCategoriesRequestBodyData>(
    (data: DeleteCategoriesRequestBodyData) => DeleteCategories(data),
    options
  );
}
