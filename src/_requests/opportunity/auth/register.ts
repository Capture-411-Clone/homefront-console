import { AxiosResponse } from 'axios';
import {
  RegisterRequestBodyType,
  RegisterResponseDataType,
} from 'src/@types/opportunity/auth/register';
// eslint-disable-next-line import/no-cycle
import { opportunityNoRefresh } from 'src/_clients/opportunity';

export default async function Register(
  data: RegisterRequestBodyType
): Promise<RegisterResponseDataType> {
  const response = await opportunityNoRefresh.post<
    RegisterRequestBodyType,
    AxiosResponse<RegisterResponseDataType>
  >('/api/v1/register', data);

  return response.data;
}
