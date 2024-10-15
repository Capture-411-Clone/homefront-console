import { AxiosResponse } from 'axios';
import { opportunity } from 'src/_clients';

import {
  CalculateOpportunityPriceRequestBodyType,
  CalculateOpportunityPriceResponseType,
} from 'src/@types/opportunity/opportunity/calculateOpportunityPrice';

export default async function CalculateOpportunityPrice({
  ID,
}: CalculateOpportunityPriceRequestBodyType): Promise<CalculateOpportunityPriceResponseType> {
  const response = await opportunity.get<
    void,
    AxiosResponse<CalculateOpportunityPriceResponseType>
  >(`/api/v1/opportunities/${ID.toString()}/price`);

  return response.data;
}
