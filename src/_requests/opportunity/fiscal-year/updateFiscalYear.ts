import { AxiosResponse } from 'axios';
import {
  UpdateFiscalYearRequestBodyType,
  UpdateFiscalYearResponseType,
} from 'src/@types/opportunity/fiscal-year/updateFiscalYearData';
import { opportunity } from 'src/_clients';

export default async function UpdateCategory({
  year,
  ID,
}: UpdateFiscalYearRequestBodyType): Promise<UpdateFiscalYearResponseType> {
  const response = await opportunity.put<
    UpdateFiscalYearRequestBodyType,
    AxiosResponse<UpdateFiscalYearResponseType>
  >(`/api/v1/fiscalYears/${ID}`, year);

  return response.data;
}
