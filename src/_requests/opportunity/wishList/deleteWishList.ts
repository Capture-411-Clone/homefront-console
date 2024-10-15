import { AxiosResponse } from 'axios';
import {
  DeleteWishListRequestBodyType,
  DeleteWishListResponseType,
} from 'src/@types/opportunity/wish-list/deleteWishListData';
import { opportunity } from 'src/_clients';

export default async function DeleteWishList(
  ids: DeleteWishListRequestBodyType
): Promise<DeleteWishListResponseType> {
  const response = await opportunity.delete<
    DeleteWishListRequestBodyType,
    AxiosResponse<DeleteWishListResponseType>
  >('/api/v1/wishlists', {
    data: ids,
  });

  return response.data;
}
