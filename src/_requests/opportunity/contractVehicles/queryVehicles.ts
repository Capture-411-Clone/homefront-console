import { AxiosResponse } from 'axios';
import {
  QueryContractVehiclesResponseType,
  ContractVehiclesQueryFiltersType,
} from 'src/@types/opportunity/contract-vehicles/queyContractVehiclesData';
import { opportunity } from 'src/_clients';

export default async function QueryContractVehicles(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: ContractVehiclesQueryFiltersType
): Promise<QueryContractVehiclesResponseType> {
  const response = await opportunity.get<void, AxiosResponse<QueryContractVehiclesResponseType>>(
    '/api/v1/contractVehicles',
    {
      params: {
        id,
        page,
        per_page,
        order,
        order_by,
        filters: JSON.stringify(filters),
      },
    }
  );

  return response.data;
}
