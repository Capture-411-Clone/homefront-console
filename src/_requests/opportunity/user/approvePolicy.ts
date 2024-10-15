import { AxiosResponse } from 'axios';
import { ApprovePolicyResponseType } from 'src/@types/opportunity/user/approvePolicyData';
// eslint-disable-next-line import/no-cycle
import { opportunity } from 'src/_clients';

export default async function ApprovePolicy(): Promise<ApprovePolicyResponseType> {
  const response = await opportunity.post<void, AxiosResponse<ApprovePolicyResponseType>>(
    `/api/v1/users/approvePolicy`
  );

  return response.data;
}
