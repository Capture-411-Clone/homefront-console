import { AxiosResponse } from 'axios';
import {
  CheckEmailExistsRequestBodyType,
  CheckEmailExistsResponseType,
} from 'src/@types/opportunity/verify/checkEmailExists';
// eslint-disable-next-line import/no-cycle
import { opportunity } from 'src/_clients';

export default async function CheckEmailExists(
  data: CheckEmailExistsRequestBodyType
): Promise<CheckEmailExistsResponseType> {
  const response = await opportunity.post<
    CheckEmailExistsRequestBodyType,
    AxiosResponse<CheckEmailExistsResponseType>
  >('/api/v1/verifications/exchange', data);

  return response.data;
}
