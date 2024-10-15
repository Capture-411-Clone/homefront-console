import { AxiosResponse } from 'axios';
import {
  UpdateDeparmentRequestBodyType,
  UpdateDepartmentResponseType,
} from 'src/@types/opportunity/department/updateDeparmentData';
import { opportunity } from 'src/_clients';

export default async function UpdateDepartment({
  department,
  ID,
}: UpdateDeparmentRequestBodyType): Promise<UpdateDepartmentResponseType> {
  const response = await opportunity.put<
    UpdateDeparmentRequestBodyType,
    AxiosResponse<UpdateDepartmentResponseType>
  >(`/api/v1/departments/${ID}`, department);

  return response.data;
}
