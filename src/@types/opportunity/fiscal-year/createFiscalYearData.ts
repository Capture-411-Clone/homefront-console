import { FiscalYearData } from './fiscalYearData';

export type CreateFiscalYearRequestBodyType = {
  year: string;
};

export type CreateFiscalYearResponseType = {
  statusCode: number;
  data: FiscalYearData;
};
