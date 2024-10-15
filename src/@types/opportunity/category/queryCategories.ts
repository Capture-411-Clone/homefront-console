import { FilterValueString } from 'src/@types/site/filters';
import { CategoryData } from './categoryData';

export type CategoriesQueryFiltersType = {
  name?: FilterValueString;
  createdAt?: FilterValueString;
};

export type QueryCategoriesResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: CategoryData[];
  };
};
