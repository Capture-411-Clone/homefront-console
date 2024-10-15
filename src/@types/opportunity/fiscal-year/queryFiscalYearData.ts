import { FilterValueString } from 'src/@types/site/filters';
import { FiscalYearData } from './fiscalYearData';

export type FiscalYearsQueryFiltersType = {
  year?: FilterValueString;
  similar_name?: FilterValueString;
  createdAt?: FilterValueString;
};
export type QueryFiscalYearResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: FiscalYearData[];
  };
};
