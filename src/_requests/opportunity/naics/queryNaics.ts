import { AxiosResponse } from 'axios';
import {
  NaicsQueryFiltersType,
  QueryNaicsResponseType,
} from 'src/@types/opportunity/naics/queryNaicsData';
import { opportunity } from 'src/_clients';

export default async function QueryNaics(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: NaicsQueryFiltersType
): Promise<QueryNaicsResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await opportunity.get<void, AxiosResponse<QueryNaicsResponseType>>(
    '/api/v1/naicses',
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
