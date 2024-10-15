import { AxiosResponse } from 'axios';
import {
  CreateSetAsideRequestBodyType,
  CreateSetAsideResponseType,
} from 'src/@types/opportunity/set-aside/createSetAsideData';
import { opportunity } from 'src/_clients';

export default async function CreateSetAside(
  data: CreateSetAsideRequestBodyType
): Promise<CreateSetAsideResponseType> {
  const response = await opportunity.post<
    CreateSetAsideRequestBodyType,
    AxiosResponse<CreateSetAsideResponseType>
  >(`/api/v1/setAsides`, data);

  return response.data;
}
