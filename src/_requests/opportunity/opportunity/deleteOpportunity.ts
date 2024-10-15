import { AxiosResponse } from 'axios';
import {
  DeleteOpportunityRequestBodyType,
  DeleteOpportunityResponseType,
} from 'src/@types/opportunity/opportunity/deleteOpportunity';
import { opportunity } from 'src/_clients';

export default async function DeleteOpportunity(
  ids: DeleteOpportunityRequestBodyType
): Promise<DeleteOpportunityResponseType> {
  const response = await opportunity.delete<
    DeleteOpportunityRequestBodyType,
    AxiosResponse<DeleteOpportunityResponseType>
  >('/api/v1/opportunities', {
    data: ids,
  });

  return response.data;
}
