import { AxiosResponse } from 'axios';
import {
  ApproveEmailRequestBodyType,
  ApproveEmailResponseType,
} from 'src/@types/opportunity/auth/approveEmail';
// eslint-disable-next-line import/no-cycle
import { opportunity } from 'src/_clients';

export default async function ApproveEmail({
  code,
}: ApproveEmailRequestBodyType): Promise<ApproveEmailResponseType> {
  const response = await opportunity.post<
    ApproveEmailRequestBodyType,
    AxiosResponse<ApproveEmailResponseType>
  >(`/api/v1/accounts/approve-email/${code}`);

  return response.data;
}
