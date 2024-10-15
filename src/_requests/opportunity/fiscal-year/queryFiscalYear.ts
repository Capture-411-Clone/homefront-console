import { AxiosResponse } from 'axios';
import {
  FiscalYearsQueryFiltersType,
  QueryFiscalYearResponseType,
} from 'src/@types/opportunity/fiscal-year/queryFiscalYearData';
import { opportunity } from 'src/_clients';

export default async function GetFiscalYear(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: FiscalYearsQueryFiltersType
): Promise<QueryFiscalYearResponseType> {
  const response = await opportunity.get<void, AxiosResponse<QueryFiscalYearResponseType>>(
    '/api/v1/fiscalYears',
    {
      params: {
        id,
        page,
        per_page,
        order,
        order_by,
        filters: JSON.stringify(filters),
      },
    }
  );

  return response.data;
}
