import { AxiosResponse } from 'axios';
import {
  UpdateUserRequestBodyType,
  UpdateUserResponseType,
} from 'src/@types/opportunity/user/updateUser';
import { opportunity } from 'src/_clients';

export default async function UpdateUser({
  user,
  ID,
}: UpdateUserRequestBodyType): Promise<UpdateUserResponseType> {
  const response = await opportunity.put<
    UpdateUserRequestBodyType,
    AxiosResponse<UpdateUserResponseType>
  >(`/api/v1/users/${ID}`, user);

  return response.data;
}
