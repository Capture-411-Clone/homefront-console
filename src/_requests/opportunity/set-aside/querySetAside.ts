import { AxiosResponse } from 'axios';
import {
  QuerySetAsideResponseType,
  SetAsideQueryFiltersType,
} from 'src/@types/opportunity/set-aside/querySetAsideData';
import { opportunity } from 'src/_clients';

export default async function QuerySetAside(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: SetAsideQueryFiltersType
): Promise<QuerySetAsideResponseType> {
  const response = await opportunity.get<void, AxiosResponse<QuerySetAsideResponseType>>(
    '/api/v1/setAsides',
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
