import { AxiosResponse } from 'axios';
import {
  DepartmentsQueryFiltersType,
  QueryDepartmentResponseType,
} from 'src/@types/opportunity/department/queryDepartmentsData';
import { opportunity } from 'src/_clients';

export default async function QueryDepartments(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: DepartmentsQueryFiltersType
): Promise<QueryDepartmentResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await opportunity.get<void, AxiosResponse<QueryDepartmentResponseType>>(
    '/api/v1/departments',
    {
      params: {
        id,
        page,
        per_page,
        order,
        order_by,
        filters: JSON.stringify(filters),
      },
    }
  );

  return response.data;
}
