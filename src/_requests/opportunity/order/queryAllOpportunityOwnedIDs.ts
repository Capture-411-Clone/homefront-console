import { AxiosResponse } from 'axios';
import { QueryAllOpportunityOwnedIDsResponseType } from 'src/@types/opportunity/order/queryAllOpportunityOwnedIDs';
import { opportunity } from 'src/_clients';

export default async function queryAllOpportunityOwnedIDs(): Promise<QueryAllOpportunityOwnedIDsResponseType> {
  const response = await opportunity.get<
    void,
    AxiosResponse<QueryAllOpportunityOwnedIDsResponseType>
  >(`/api/v1/orders/opportunity/owned-ids`);

  return response.data;
}
