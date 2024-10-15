import { AxiosResponse } from 'axios';
import {
  CreateNaicsRequestBodyType,
  CreateNaicsResponseType,
} from 'src/@types/opportunity/naics/createNaicsData';
import { opportunity } from 'src/_clients';

export default async function CreateNaics(
  data: CreateNaicsRequestBodyType
): Promise<CreateNaicsResponseType> {
  const response = await opportunity.post<
    CreateNaicsRequestBodyType,
    AxiosResponse<CreateNaicsResponseType>
  >(`/api/v1/naicses`, data);

  return response.data;
}
