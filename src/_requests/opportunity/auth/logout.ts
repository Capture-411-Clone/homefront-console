import { AxiosResponse } from 'axios';
import { LogoutResponseDataType } from 'src/@types/opportunity/auth/logout';
import { opportunity } from 'src/_clients';
// eslint-disable-next-line import/no-cycle

export default async function Logout(): Promise<LogoutResponseDataType> {
  const response = await opportunity.post<void, AxiosResponse<LogoutResponseDataType>>(
    '/api/v1/logout'
  );

  return response.data;
}
