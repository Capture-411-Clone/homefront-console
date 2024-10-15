import { AxiosResponse } from 'axios';
import {
  UpdateProfileRequestBodyType,
  UpdateProfileResponseType,
} from 'src/@types/opportunity/user/updateProfileData';
import { opportunity } from 'src/_clients';

export default async function UpdateProfile(
  user: UpdateProfileRequestBodyType
): Promise<UpdateProfileResponseType> {
  const response = await opportunity.post<
    UpdateProfileRequestBodyType,
    AxiosResponse<UpdateProfileResponseType>
  >(`/api/v1/accounts/update`, user);

  return response.data;
}
