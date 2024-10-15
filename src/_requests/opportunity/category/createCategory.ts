import { AxiosResponse } from 'axios';
import {
  CreateCategoryRequestType,
  CreateCategoryResponseBodyType,
} from 'src/@types/opportunity/category/createCategory';
import { opportunity } from 'src/_clients';

export default async function CreateCategory(
  data: CreateCategoryRequestType
): Promise<CreateCategoryResponseBodyType> {
  const response = await opportunity.post<
    CreateCategoryRequestType,
    AxiosResponse<CreateCategoryResponseBodyType>
  >(`/api/v1/categories`, data);

  return response.data;
}
