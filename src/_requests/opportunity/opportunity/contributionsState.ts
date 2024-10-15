import { AxiosResponse } from 'axios';
import { ContributionStateResponseType as ContributionsStateResponseType } from 'src/@types/opportunity/opportunity/contributionsState';
import { opportunity } from 'src/_clients';

export default async function ContributionsState(): Promise<ContributionsStateResponseType> {
  const response = await opportunity.get<void, AxiosResponse<ContributionsStateResponseType>>(
    `/api/v1/opportunities/contributions-state`
  );

  return response.data;
}
