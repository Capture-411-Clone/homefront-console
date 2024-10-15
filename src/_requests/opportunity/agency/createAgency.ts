import { AxiosResponse } from 'axios';
import {
  CreateAgencyRequestBodyType,
  CreateAgencyResponseType,
} from 'src/@types/opportunity/agency/createAgencyData';
import { opportunity } from 'src/_clients';

export default async function CreateAgency(
  data: CreateAgencyRequestBodyType
): Promise<CreateAgencyResponseType> {
  const response = await opportunity.post<
    CreateAgencyRequestBodyType,
    AxiosResponse<CreateAgencyResponseType>
  >(`/api/v1/agencies`, data);

  return response.data;
}
