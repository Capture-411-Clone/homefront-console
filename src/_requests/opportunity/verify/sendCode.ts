import { AxiosResponse } from 'axios';
import {
  SendCodeRequestBodyType,
  SendCodeResponseType,
} from 'src/@types/opportunity/verify/sendCode';
// eslint-disable-next-line import/no-cycle
import { opportunity } from 'src/_clients';

export default async function SendCode(
  data: SendCodeRequestBodyType
): Promise<SendCodeResponseType> {
  const response = await opportunity.post<
    SendCodeRequestBodyType,
    AxiosResponse<SendCodeResponseType>
  >('/api/v1/verifications/send', data);

  return response.data;
}
