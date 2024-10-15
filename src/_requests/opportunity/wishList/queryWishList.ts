import { AxiosResponse } from 'axios';
import {
  QueryWishListResponseType,
  WishListQueryFiltersType,
} from 'src/@types/opportunity/wish-list/queryWishListData';
import { opportunity } from 'src/_clients';

export default async function QueryWishList(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: WishListQueryFiltersType
): Promise<QueryWishListResponseType> {
  const response = await opportunity.get<void, AxiosResponse<QueryWishListResponseType>>(
    '/api/v1/wishlists',
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
