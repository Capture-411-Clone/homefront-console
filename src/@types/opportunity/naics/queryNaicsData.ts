import { FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { NaicsData } from './naicsData';

export type NaicsQueryFiltersType = {
  name?: FilterValueString;
  similar_name?: FilterValueString;
  createdAt?: FilterValueString;
  category_id?: FilterValueInt;
};

export type QueryNaicsResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: NaicsData[];
  };
};
