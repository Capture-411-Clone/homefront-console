import { AxiosResponse } from 'axios';
import {
  AgenciesQueryFiltersType,
  QueryAgenciesResponseType,
} from 'src/@types/opportunity/agency/queryAgenciesData';
import { opportunity } from 'src/_clients';

export default async function GetAllAgencies(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: AgenciesQueryFiltersType
): Promise<QueryAgenciesResponseType> {
  const response = await opportunity.get<void, AxiosResponse<QueryAgenciesResponseType>>(
    '/api/v1/agencies',
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
