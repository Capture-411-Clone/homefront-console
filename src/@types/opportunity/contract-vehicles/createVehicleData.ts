import { ContractVehiclesData } from './contractVehiclesData';

export type CreateVehicleRequestBodyType = {
  name: string;
  acronym: string;
};

export type CreateVehicleResponseType = {
  statusCode: number;
  data: ContractVehiclesData;
};
