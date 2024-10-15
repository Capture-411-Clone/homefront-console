import { AxiosResponse } from 'axios';
import { CheckDuplicateOpportunitiesResponseType } from 'src/@types/opportunity/opportunity/checkDuplicateOpportunityData';
import { opportunity } from 'src/_clients';

export default async function CheckDuplicate(
  solicitation_number: string
): Promise<CheckDuplicateOpportunitiesResponseType> {
  const response = await opportunity.get<
    void,
    AxiosResponse<CheckDuplicateOpportunitiesResponseType>
  >(`/api/v1/opportunities/${solicitation_number}/check-duplicate`);

  return response.data;
}
