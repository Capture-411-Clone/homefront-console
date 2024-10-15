import { AxiosResponse } from 'axios';
import { UserInfoResponseType } from 'src/@types/opportunity/auth/userInfo';
// eslint-disable-next-line import/no-cycle
import { opportunity } from 'src/_clients';

export default async function UserInfo(): Promise<UserInfoResponseType> {
  const response = await opportunity.get<void, AxiosResponse<UserInfoResponseType>>(
    '/api/v1/userinfo'
  );

  return response.data;
}
