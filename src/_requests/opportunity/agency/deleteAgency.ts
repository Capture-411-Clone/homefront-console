import { AxiosResponse } from 'axios';
import {
  DeleteAgencyRequestBodyType,
  DeleteAgencyResponseData,
} from 'src/@types/opportunity/agency/deleteAgencyData';
import { opportunity } from 'src/_clients';

export default async function DeleteCategories(
  ids: DeleteAgencyRequestBodyType
): Promise<DeleteAgencyResponseData> {
  const response = await opportunity.delete<
    DeleteAgencyRequestBodyType,
    AxiosResponse<DeleteAgencyResponseData>
  >('/api/v1/agencies', {
    data: ids,
  });

  return response.data;
}
