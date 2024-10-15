import { AxiosResponse } from 'axios';
import {
  DeleteUsersResponseData,
  DeleteUsersRequestBodyData,
} from 'src/@types/opportunity/user/deleteUsers';
import { opportunity } from 'src/_clients';

export default async function DeleteUsers(
  ids: DeleteUsersRequestBodyData
): Promise<DeleteUsersResponseData> {
  const response = await opportunity.delete<
    DeleteUsersRequestBodyData,
    AxiosResponse<DeleteUsersResponseData>
  >('/api/v1/users', {
    data: ids,
  });

  return response.data;
}
