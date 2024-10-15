import { AxiosResponse } from 'axios';
import {
  DeleteDepartmentRequestBodyType,
  DeleteDepartmentResponseType,
} from 'src/@types/opportunity/department/deleteDepartmentData';
import { opportunity } from 'src/_clients';

export default async function DeleteDepartment(
  ids: DeleteDepartmentRequestBodyType
): Promise<DeleteDepartmentResponseType> {
  const response = await opportunity.delete<
    DeleteDepartmentRequestBodyType,
    AxiosResponse<DeleteDepartmentResponseType>
  >('/api/v1/departments', {
    data: ids,
  });

  return response.data;
}
