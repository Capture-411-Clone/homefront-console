import { AxiosResponse } from 'axios';
import {
  DeleteCategoriesRequestBodyData,
  DeleteCategoriesResponseData,
} from 'src/@types/opportunity/category/deleteCategories';
import { opportunity } from 'src/_clients';

export default async function DeleteCategories(
  ids: DeleteCategoriesRequestBodyData
): Promise<DeleteCategoriesResponseData> {
  const response = await opportunity.delete<
    DeleteCategoriesRequestBodyData,
    AxiosResponse<DeleteCategoriesResponseData>
  >('/api/v1/categories', {
    data: ids,
  });

  return response.data;
}
