import { AxiosResponse } from 'axios';
import {
  CreatePassiveRevenueRequestBodyType,
  CreatePassiveRevenueResponseType,
} from 'src/@types/opportunity/calculators/createPassiveRevenueData';

import { opportunity } from 'src/_clients';

export default async function CreatePassiveRevenue(
  data: CreatePassiveRevenueRequestBodyType
): Promise<CreatePassiveRevenueResponseType> {
  const response = await opportunity.post<
    CreatePassiveRevenueRequestBodyType,
    AxiosResponse<CreatePassiveRevenueResponseType>
  >(`/api/v1/calculators/passive-revenue`, data);

  return response.data;
}
