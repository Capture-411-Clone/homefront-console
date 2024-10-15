import { AxiosResponse } from 'axios';
import {
  CreateUserRequestBodyType,
  CreateUserResponseType,
} from 'src/@types/opportunity/user/createUser';
import { opportunity } from 'src/_clients';

export default async function CreateUser(
  user: CreateUserRequestBodyType
): Promise<CreateUserResponseType> {
  const response = await opportunity.post<
    CreateUserRequestBodyType,
    AxiosResponse<CreateUserResponseType>
  >(`/api/v1/users`, user);

  return response.data;
}
