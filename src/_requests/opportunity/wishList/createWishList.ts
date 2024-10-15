import { AxiosResponse } from 'axios';
import {
  CreateWishListRequestBodyType,
  CreateWishListResponseType,
} from 'src/@types/opportunity/wish-list/createWishListData';
import { opportunity } from 'src/_clients';

export default async function CreateWishList(
  data: CreateWishListRequestBodyType
): Promise<CreateWishListResponseType> {
  const response = await opportunity.post<
    CreateWishListRequestBodyType,
    AxiosResponse<CreateWishListResponseType>
  >(`/api/v1/wishlists`, data);

  return response.data;
}
