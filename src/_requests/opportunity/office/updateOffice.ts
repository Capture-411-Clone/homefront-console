import { AxiosResponse } from 'axios';
import {
  UpdateOfficeRequestBodyType,
  UpdateOfficeResponseType,
} from 'src/@types/opportunity/office/updateOffices';
import { opportunity } from 'src/_clients';

export default async function UpdateOffice({
  office,
  ID,
}: UpdateOfficeRequestBodyType): Promise<UpdateOfficeResponseType> {
  const response = await opportunity.put<
    UpdateOfficeRequestBodyType,
    AxiosResponse<UpdateOfficeResponseType>
  >(`/api/v1/offices/${ID}`, office);

  return response.data;
}
