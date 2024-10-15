import { WishListData } from './wishListData';

export type CreateWishListRequestBodyType = {
  opportunity_id: number;
};

export type CreateWishListResponseType = {
  statusCode: number;
  data: WishListData;
};
