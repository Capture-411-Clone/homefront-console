import { AxiosResponse } from 'axios';
import {
  CreateOpportunityRequestBodyType,
  CreateOpportunityResponseType,
} from 'src/@types/opportunity/opportunity/createOpportunityData';
import { opportunity } from 'src/_clients';

export default async function CreateOpportunity(
  opportunityData: CreateOpportunityRequestBodyType
): Promise<CreateOpportunityResponseType> {
  const response = await opportunity.post<
    CreateOpportunityRequestBodyType,
    AxiosResponse<CreateOpportunityResponseType>
  >(`/api/v1/opportunities`, opportunityData);

  return response.data;
}
