import { AxiosResponse } from 'axios';
import { CreateAddressRequestBodyType } from 'src/@types/opportunity/address/createAddressData';
import {
  CreateFiscalYearRequestBodyType,
  CreateFiscalYearResponseType,
} from 'src/@types/opportunity/fiscal-year/createFiscalYearData';
import { opportunity } from 'src/_clients';

export default async function CreateFiscalYear(
  data: CreateFiscalYearRequestBodyType
): Promise<CreateFiscalYearResponseType> {
  const response = await opportunity.post<
    CreateFiscalYearRequestBodyType,
    AxiosResponse<CreateFiscalYearResponseType>
  >(`/api/v1/fiscalYears`, data);

  return response.data;
}
