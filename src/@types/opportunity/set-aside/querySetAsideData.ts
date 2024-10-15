import { FilterValueString } from 'src/@types/site/filters';
import { SetAsideData } from './setAsideData';

export type SetAsideQueryFiltersType = {
  name?: FilterValueString;
  similar_name?: FilterValueString;
  createdAt?: FilterValueString;
};

export type QuerySetAsideResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: SetAsideData[];
  };
};
