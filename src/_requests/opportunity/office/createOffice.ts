import { AxiosResponse } from 'axios';
import {
  CreateOfficeRequestBodyType,
  CreateOfficeResponseType,
} from 'src/@types/opportunity/office/createOfficeData';
import { opportunity } from 'src/_clients';

export default async function CreateOffices(
  data: CreateOfficeRequestBodyType
): Promise<CreateOfficeResponseType> {
  const response = await opportunity.post<
    CreateOfficeRequestBodyType,
    AxiosResponse<CreateOfficeResponseType>
  >(`/api/v1/offices`, data);

  return response.data;
}
