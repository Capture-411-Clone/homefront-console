import { AxiosResponse } from 'axios';
import {
  DeleteVehicleRequestBodyType,
  DeleteVehicleResponseType,
} from 'src/@types/opportunity/contract-vehicles/deleteVehicleData';
import { opportunity } from 'src/_clients';

export default async function DeleteVehicle(
  ids: DeleteVehicleRequestBodyType
): Promise<DeleteVehicleResponseType> {
  const response = await opportunity.delete<
    DeleteVehicleRequestBodyType,
    AxiosResponse<DeleteVehicleResponseType>
  >('/api/v1/contractVehicles', {
    data: ids,
  });

  return response.data;
}
