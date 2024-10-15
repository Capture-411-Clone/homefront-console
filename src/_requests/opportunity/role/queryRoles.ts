import { AxiosResponse } from 'axios';
import { QueryRolesResponseType } from 'src/@types/opportunity/role/queryRoleData';
import { opportunity } from 'src/_clients';

export default async function QueryRoles(): Promise<QueryRolesResponseType> {
  const response = await opportunity.get<void, AxiosResponse<QueryRolesResponseType>>(
    '/api/v1/roles/list'
  );

  return response.data;
}
