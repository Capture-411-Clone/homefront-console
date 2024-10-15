import { AxiosResponse } from 'axios';
import {
  UpdateCategoryRequestBodyType,
  UpdateCategoryResponseType,
} from 'src/@types/opportunity/category/updateCategory';
import { opportunity } from 'src/_clients';

export default async function UpdateCategory({
  category,
  ID,
}: UpdateCategoryRequestBodyType): Promise<UpdateCategoryResponseType> {
  const response = await opportunity.put<
    UpdateCategoryRequestBodyType,
    AxiosResponse<UpdateCategoryResponseType>
  >(`/api/v1/categories/${ID}`, category);

  return response.data;
}
