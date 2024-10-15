import { AxiosResponse } from 'axios';
import {
  UpdateVehicleRequestBodyType,
  UpdateVehicleResponseType,
} from 'src/@types/opportunity/contract-vehicles/updateVehicleData';
import { opportunity } from 'src/_clients';

export default async function UpdateVehicle({
  vehicle,
  ID,
}: UpdateVehicleRequestBodyType): Promise<UpdateVehicleResponseType> {
  const response = await opportunity.put<
    UpdateVehicleRequestBodyType,
    AxiosResponse<UpdateVehicleResponseType>
  >(`/api/v1/contractVehicles/${ID}`, vehicle);

  return response.data;
}
