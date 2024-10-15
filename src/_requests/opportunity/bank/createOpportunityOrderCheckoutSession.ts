import { AxiosResponse } from 'axios';
import {
  CreateOpportunityOrderCheckoutSessionRequestBodyType,
  CreateOpportunityOrderCheckoutSessionResponseType,
} from 'src/@types/opportunity/bank/createOpportunityOrderCheckoutSession';

import { opportunity } from 'src/_clients';

export default async function CreateOpportunityOrderCheckoutSession(
  data: CreateOpportunityOrderCheckoutSessionRequestBodyType
): Promise<CreateOpportunityOrderCheckoutSessionResponseType> {
  const response = await opportunity.post<
    CreateOpportunityOrderCheckoutSessionRequestBodyType,
    AxiosResponse<CreateOpportunityOrderCheckoutSessionResponseType>
  >(`/api/v1/bank/create-opportunity-order-checkout-session`, data);

  return response.data;
}
