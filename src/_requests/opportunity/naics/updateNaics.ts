import { AxiosResponse } from 'axios';
import {
  UpdateNaicsRequestBodyType,
  UpdateNaicsResponseType,
} from 'src/@types/opportunity/naics/updateNaicsData';
import { opportunity } from 'src/_clients';

export default async function UpdateNaics({
  naics,
  ID,
}: UpdateNaicsRequestBodyType): Promise<UpdateNaicsResponseType> {
  const response = await opportunity.put<
    UpdateNaicsRequestBodyType,
    AxiosResponse<UpdateNaicsResponseType>
  >(`/api/v1/naicses/${ID}`, naics);

  return response.data;
}
