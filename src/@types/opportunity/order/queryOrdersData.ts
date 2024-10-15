import { FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { OrderData } from './orderData';

export type QueryOrdersResponseBodyType = {
  data: {
    items: OrderData[];
    limit: number;
    offset: number;
    page: number;
    totalPages: number;
    totalRows: number;
  };
  status_code: number;
};
export type OrdersQueryFiltersType = {
  name?: FilterValueString;
  similar_name?: FilterValueString;
  acronym?: string;
  createdAt?: FilterValueString;
  agency_id?: FilterValueInt;
};
