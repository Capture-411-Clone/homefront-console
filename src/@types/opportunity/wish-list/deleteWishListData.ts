export type DeleteWishListRequestBodyType = { ids: string };

export type DeleteWishListResponseType = {
  statusCode: number;
  data: {
    ids: string;
  };
};
