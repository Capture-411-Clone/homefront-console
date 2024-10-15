import { AxiosResponse } from 'axios';
import {
  OrdersQueryFiltersType,
  QueryOrdersResponseBodyType,
} from 'src/@types/opportunity/order/queryOrdersData';

import { opportunity } from 'src/_clients';

export default async function GetAllOrders(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: OrdersQueryFiltersType
): Promise<QueryOrdersResponseBodyType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await opportunity.get<void, AxiosResponse<QueryOrdersResponseBodyType>>(
    '/api/v1/orders',
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
