import { AxiosResponse } from 'axios';
import {
  CreateVehicleRequestBodyType,
  CreateVehicleResponseType,
} from 'src/@types/opportunity/contract-vehicles/createVehicleData';
import { opportunity } from 'src/_clients';

export default async function CreateVehicle(
  data: CreateVehicleRequestBodyType
): Promise<CreateVehicleResponseType> {
  const response = await opportunity.post<
    CreateVehicleRequestBodyType,
    AxiosResponse<CreateVehicleResponseType>
  >(`/api/v1/contractVehicles`, data);

  return response.data;
}
