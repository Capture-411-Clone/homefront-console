import { AxiosResponse } from 'axios';
import {
  DeleteNaicsRequestBodyType,
  DeleteNaicsResponseData,
} from 'src/@types/opportunity/naics/deleteNaicsData';
import { opportunity } from 'src/_clients';

export default async function DeleteNaics(
  ids: DeleteNaicsRequestBodyType
): Promise<DeleteNaicsResponseData> {
  const response = await opportunity.delete<
    DeleteNaicsRequestBodyType,
    AxiosResponse<DeleteNaicsResponseData>
  >('/api/v1/naicses', {
    data: ids,
  });

  return response.data;
}
