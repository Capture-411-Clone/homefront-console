import { AxiosResponse } from 'axios';
import {
  ExchangeCodeRequestBodyType,
  ExchangeCodeResponseType,
} from 'src/@types/opportunity/verify/exchange';
// eslint-disable-next-line import/no-cycle
import { opportunity } from 'src/_clients';

export default async function ExchangeCode(
  data: ExchangeCodeRequestBodyType
): Promise<ExchangeCodeResponseType> {
  const response = await opportunity.post<
    ExchangeCodeRequestBodyType,
    AxiosResponse<ExchangeCodeResponseType>
  >('/api/v1/verifications/exchange', data);

  return response.data;
}
