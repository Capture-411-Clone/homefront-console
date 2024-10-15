import { AxiosResponse } from 'axios';
import {
  MarketsQueryFiltersType,
  QueryMarketsResponseBodyType,
} from 'src/@types/opportunity/market/queryMarketsData';
import { opportunity } from 'src/_clients';

export default async function QueryMarkets(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: MarketsQueryFiltersType
): Promise<QueryMarketsResponseBodyType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await opportunity.get<void, AxiosResponse<QueryMarketsResponseBodyType>>(
    '/api/v1/markets',
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
