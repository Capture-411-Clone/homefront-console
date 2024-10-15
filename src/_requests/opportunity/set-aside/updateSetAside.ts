import { AxiosResponse } from 'axios';
import {
  UpdateSetAsideRequestBodyType,
  UpdateSetAsideResponseType,
} from 'src/@types/opportunity/set-aside/updateSetAsideData';
import { opportunity } from 'src/_clients';

export default async function UpdateSetAside({
  setAside,
  ID,
}: UpdateSetAsideRequestBodyType): Promise<UpdateSetAsideResponseType> {
  const response = await opportunity.put<
    UpdateSetAsideRequestBodyType,
    AxiosResponse<UpdateSetAsideResponseType>
  >(`/api/v1/setAsides/${ID}`, setAside);

  return response.data;
}
