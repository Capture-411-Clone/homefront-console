import { AxiosResponse } from 'axios';
import {
  UpdateAgencyRequestBodyType,
  UpdateAgencyResponseType,
} from 'src/@types/opportunity/agency/updateAgencyData';
import { opportunity } from 'src/_clients';

export default async function UpdateAgency({
  agency,
  ID,
}: UpdateAgencyRequestBodyType): Promise<UpdateAgencyResponseType> {
  const response = await opportunity.put<
    UpdateAgencyRequestBodyType,
    AxiosResponse<UpdateAgencyResponseType>
  >(`/api/v1/agencies/${ID}`, agency);

  return response.data;
}
