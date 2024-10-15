import { AxiosResponse } from 'axios';
import {
  QueryUsersResponseType,
  UsersQueryFiltersType,
} from 'src/@types/opportunity/user/queryUsersData';
import { opportunity } from 'src/_clients';

export default async function GetAllUsers(
  id: string,
  page: number,
  per_page: number,
  query: string,
  order: string,
  order_by: string,
  filters?: UsersQueryFiltersType
): Promise<QueryUsersResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await opportunity.get<void, AxiosResponse<QueryUsersResponseType>>(
    `/api/v1/users`,
    {
      params: { id, page, per_page, query, order, order_by, filters: JSON.stringify(filters) },
    }
  );

  return response.data;
}
