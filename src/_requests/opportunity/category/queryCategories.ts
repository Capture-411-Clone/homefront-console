import { AxiosResponse } from 'axios';
import {
  CategoriesQueryFiltersType,
  QueryCategoriesResponseType,
} from 'src/@types/opportunity/category/queryCategories';
import { opportunity } from 'src/_clients';

export default async function QueryCategories(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: CategoriesQueryFiltersType
): Promise<QueryCategoriesResponseType> {
  const response = await opportunity.get<void, AxiosResponse<QueryCategoriesResponseType>>(
    '/api/v1/categories',
    {
      params: {
        id,
        page,
        per_page,
        order,
        order_by,
        filters: JSON.stringify(filters),
      },
    }
  );

  return response.data;
}
