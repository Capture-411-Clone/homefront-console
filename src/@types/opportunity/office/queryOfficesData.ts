import { FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { OfficeData } from './officeData';

export type OfficesQueryFiltersType = {
  name?: FilterValueString;
  similar_name?: FilterValueString;
  acronym?: string;
  createdAt?: FilterValueString;
  agency_id?: FilterValueInt;
};
export type QueryOfficesResponseBodyType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: OfficeData[];
  };
};
