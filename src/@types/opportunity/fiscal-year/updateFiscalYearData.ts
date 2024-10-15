import { FiscalYearData } from './fiscalYearData';

export type UpdateFiscalYearRequestBodyType = {
  year: { year: string };
  ID: number;
};

export type UpdateFiscalYearResponseType = {
  statusCode: number;
  data: FiscalYearData;
};
