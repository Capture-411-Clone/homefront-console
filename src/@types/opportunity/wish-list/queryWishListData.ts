import { FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { WishListData } from './wishListData';

export type WishListQueryFiltersType = {
  opportunity_id?: FilterValueInt;
  createdAt?: FilterValueString;
};

export type QueryWishListResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: WishListData[];
  };
};
