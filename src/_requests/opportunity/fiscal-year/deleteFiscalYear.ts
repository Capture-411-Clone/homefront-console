import { AxiosResponse } from 'axios';
import {
  DeleteFiscalYearRequestBodyType,
  DeleteFiscalYearResponseType,
} from 'src/@types/opportunity/fiscal-year/deleteFiscalYearData';
import { opportunity } from 'src/_clients';

export default async function DeleteCategories(
  ids: DeleteFiscalYearRequestBodyType
): Promise<DeleteFiscalYearResponseType> {
  const response = await opportunity.delete<
    DeleteFiscalYearRequestBodyType,
    AxiosResponse<DeleteFiscalYearResponseType>
  >('/api/v1/fiscalYears', {
    data: ids,
  });

  return response.data;
}
