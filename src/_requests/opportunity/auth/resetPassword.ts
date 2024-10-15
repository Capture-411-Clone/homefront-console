import { AxiosResponse } from 'axios';
import {
  ResetPasswordRequestBodyType,
  ResetPasswordResponseDataType,
} from 'src/@types/opportunity/auth/resetPassword';
import { opportunityNoRefresh } from 'src/_clients/opportunity';
// eslint-disable-next-line import/no-cycle

export default async function ResetPassword(
  data: ResetPasswordRequestBodyType
): Promise<ResetPasswordResponseDataType> {
  const response = await opportunityNoRefresh.post<
    ResetPasswordRequestBodyType,
    AxiosResponse<ResetPasswordResponseDataType>
  >('/api/v1/resetPassword', data);

  return response.data;
}
