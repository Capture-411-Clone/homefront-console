import { AxiosResponse } from 'axios';
import { LoginResponseDataType } from 'src/@types/opportunity/auth/login';
// eslint-disable-next-line import/no-cycle
import { opportunity } from 'src/_clients';

export default async function Login(userID: string): Promise<LoginResponseDataType> {
  const response = await opportunity.post<void, AxiosResponse<LoginResponseDataType>>(
    `/api/v1/impersonate/${userID}`
  );

  return response.data;
}
