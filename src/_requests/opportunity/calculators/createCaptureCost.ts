import { AxiosResponse } from 'axios';
import {
  CreateCaptureCostRequestBodyType,
  CreateCaptureCostResponseType,
} from 'src/@types/opportunity/calculators/createCaptureCostData';

import { opportunity } from 'src/_clients';

export default async function CreateCaptureCost(
  data: CreateCaptureCostRequestBodyType
): Promise<CreateCaptureCostResponseType> {
  const response = await opportunity.post<
    CreateCaptureCostRequestBodyType,
    AxiosResponse<CreateCaptureCostResponseType>
  >(`/api/v1/calculators/capture-cost`, data);

  return response.data;
}
