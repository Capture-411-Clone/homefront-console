import { ContractVehiclesData } from './contractVehiclesData';

export type UpdateVehicleRequestBodyType = {
  vehicle: { name: string; acronym: string };
  ID: number;
};

export type UpdateVehicleResponseType = {
  statusCode: number;
  data: ContractVehiclesData;
};
