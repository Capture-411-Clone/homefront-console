// eslint-disable-next-line import/no-cycle
import { AxiosResponse } from 'axios';
import {
  ChangePasswordRequestBodyType,
  ChangePasswordResponseType,
} from 'src/@types/opportunity/auth/changePassword';
import { opportunity } from 'src/_clients';

export default async function ChangePassword(
  data: ChangePasswordRequestBodyType
): Promise<ChangePasswordResponseType> {
  const response = await opportunity.patch<
    ChangePasswordRequestBodyType,
    AxiosResponse<ChangePasswordResponseType>
  >(`/api/v1/change-password`, data);

  return response.data;
}
