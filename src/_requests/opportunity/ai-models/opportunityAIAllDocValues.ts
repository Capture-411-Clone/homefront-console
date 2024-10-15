import { AxiosResponse } from 'axios';
import {
  OpportunityAIAllDocValuesRequest,
  OpportunityAIAllDocValuesResponseType,
} from 'src/@types/opportunity/ai-models/opportunityAIAllDocValues';
import { opportunity } from 'src/_clients';

export default async function OpportunityAIAllDocValues(
  data: OpportunityAIAllDocValuesRequest
): Promise<OpportunityAIAllDocValuesResponseType> {
  const response = await opportunity.post<
    OpportunityAIAllDocValuesRequest,
    AxiosResponse<OpportunityAIAllDocValuesResponseType>
  >(`/api/v1/opportunities/ai-all-doc-values`, data);

  return response.data;
}
