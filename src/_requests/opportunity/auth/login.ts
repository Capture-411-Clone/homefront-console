import { AxiosResponse } from 'axios';
import { LoginRequestBodyType, LoginResponseDataType } from 'src/@types/opportunity/auth/login';
import { opportunityNoRefresh } from 'src/_clients/opportunity';
// eslint-disable-next-line import/no-cycle

export default async function Login(data: LoginRequestBodyType): Promise<LoginResponseDataType> {
  const response = await opportunityNoRefresh.post<
    LoginRequestBodyType,
    AxiosResponse<LoginResponseDataType>
  >('/api/v1/login', data);

  return response.data;
}
