import { AxiosResponse } from 'axios';
import {
  CreateDepartmentRequestBodyType,
  CreateDepartmentResponseType,
} from 'src/@types/opportunity/department/createDepartmentData';
import { opportunity } from 'src/_clients';

export default async function CreateDepartment(
  data: CreateDepartmentRequestBodyType
): Promise<CreateDepartmentResponseType> {
  const response = await opportunity.post<
    CreateDepartmentRequestBodyType,
    AxiosResponse<CreateDepartmentResponseType>
  >(`/api/v1/departments`, data);

  return response.data;
}
