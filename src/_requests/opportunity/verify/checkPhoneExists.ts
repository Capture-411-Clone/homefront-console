import { AxiosResponse } from 'axios';
import {
  CheckPhoneExistsRequestBodyType,
  CheckPhoneExistsResponseType,
} from 'src/@types/opportunity/verify/checkPhoneExists';
// eslint-disable-next-line import/no-cycle
import { opportunity } from 'src/_clients';

export default async function CheckPhoneExists(
  data: CheckPhoneExistsRequestBodyType
): Promise<CheckPhoneExistsResponseType> {
  const response = await opportunity.post<
    CheckPhoneExistsRequestBodyType,
    AxiosResponse<CheckPhoneExistsResponseType>
  >('/api/v1/verifications/exchange', data);

  return response.data;
}
