import { AxiosResponse } from 'axios';
import { GetUserResponseType } from 'src/@types/opportunity/user/getUser';
import { opportunity } from 'src/_clients';

export default async function GetUser(
  id: string
  // filter?: GetAllDocumentsFilterType
): Promise<GetUserResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await opportunity.get<void, AxiosResponse<GetUserResponseType>>(
    `/api/v1/users`,
    {
      params: { id },
    }
  );

  return response.data;
}
