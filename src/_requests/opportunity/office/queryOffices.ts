import { AxiosResponse } from 'axios';
import {
  OfficesQueryFiltersType,
  QueryOfficesResponseBodyType,
} from 'src/@types/opportunity/office/queryOfficesData';
import { opportunity } from 'src/_clients';

export default async function GetAllOffices(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: OfficesQueryFiltersType
): Promise<QueryOfficesResponseBodyType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await opportunity.get<void, AxiosResponse<QueryOfficesResponseBodyType>>(
    '/api/v1/offices',
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
