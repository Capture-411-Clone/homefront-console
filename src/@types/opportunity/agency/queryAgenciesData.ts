import { FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { AgencyData } from './agencyData';

export type AgenciesQueryFiltersType = {
  name?: FilterValueString;
  similar_name?: FilterValueString;
  department_id?: FilterValueInt;
  createdAt?: FilterValueString;
};

export type QueryAgenciesResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: AgencyData[];
  };
};
