import { AxiosResponse } from 'axios';
import {
  OpportunityAIDocValuesRequest,
  OpportunityAIDocValuesResponseType,
} from 'src/@types/opportunity/ai-models/opportunityAIDocValues';
import { opportunity } from 'src/_clients';

export default async function OpportunityAIDocValues(
  data: OpportunityAIDocValuesRequest
): Promise<OpportunityAIDocValuesResponseType> {
  const response = await opportunity.post<
    OpportunityAIDocValuesRequest,
    AxiosResponse<OpportunityAIDocValuesResponseType>
  >(`/api/v1/opportunities/ai-doc-values`, data);

  return response.data;
}
