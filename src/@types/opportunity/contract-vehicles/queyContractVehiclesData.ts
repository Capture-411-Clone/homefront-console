import { FilterValueString } from 'src/@types/site/filters';
import { ContractVehiclesData } from './contractVehiclesData';

export type ContractVehiclesQueryFiltersType = {
  name?: FilterValueString;
  similar_name?: FilterValueString;
  createdAt?: FilterValueString;
};

export type QueryContractVehiclesResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: ContractVehiclesData[];
  };
};
