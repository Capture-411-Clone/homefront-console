import { AxiosResponse } from 'axios';
import {
  DeleteSetAsideRequestBodyData,
  DeleteSetAsideResponseData,
} from 'src/@types/opportunity/set-aside/deleteSetAsideData';
import { opportunity } from 'src/_clients';

export default async function DeleteSetAside(
  ids: DeleteSetAsideRequestBodyData
): Promise<DeleteSetAsideResponseData> {
  const response = await opportunity.delete<
    DeleteSetAsideRequestBodyData,
    AxiosResponse<DeleteSetAsideResponseData>
  >('/api/v1/setAsides', {
    data: ids,
  });

  return response.data;
}
