import { AxiosResponse } from 'axios';
import {
  OpportunitiesQueryFiltersType,
  QueryOpportunitiesResponseType,
} from 'src/@types/opportunity/opportunity/queryOpportunityData';
import { opportunity } from 'src/_clients';

export default async function QueryOpportunity(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  query: string,
  mine_only: string,
  my_pipeline: string,
  filters: OpportunitiesQueryFiltersType
): Promise<QueryOpportunitiesResponseType> {
  const response = await opportunity.get<void, AxiosResponse<QueryOpportunitiesResponseType>>(
    `/api/v1/opportunities`,
    {
      params: {
        id,
        page,
        per_page,
        order,
        order_by,
        query,
        mine_only,
        my_pipeline,
        filters: JSON.stringify(filters),
      },
    }
  );

  return response.data;
}
