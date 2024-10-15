import { AxiosResponse } from 'axios';
import {
  UpdateOpportunityRequestBodyType,
  UpdateOpportunityResponseType,
} from 'src/@types/opportunity/opportunity/updateOpportunityData';
import { opportunity } from 'src/_clients';

export default async function updateOpportunity({
  opportunityData,
  ID,
}: UpdateOpportunityRequestBodyType): Promise<UpdateOpportunityResponseType> {
  const response = await opportunity.put<
    UpdateOpportunityRequestBodyType,
    AxiosResponse<UpdateOpportunityResponseType>
  >(`/api/v1/opportunities/${ID}`, opportunityData);

  return response.data;
}
