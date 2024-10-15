import { AxiosResponse } from 'axios';
import {
  DeleteOfficesRequestBodyData,
  DeleteOfficesResponseData,
} from 'src/@types/opportunity/office/deleteOfficesData';
import { opportunity } from 'src/_clients';

export default async function DeleteOffices(
  ids: DeleteOfficesRequestBodyData
): Promise<DeleteOfficesResponseData> {
  const response = await opportunity.delete<
    DeleteOfficesRequestBodyData,
    AxiosResponse<DeleteOfficesResponseData>
  >('/api/v1/offices', {
    data: ids,
  });

  return response.data;
}
