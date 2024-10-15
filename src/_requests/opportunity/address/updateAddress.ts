import { AxiosResponse } from 'axios';
import {
  updateAddressRequestBodyType,
  updateAddressResponseType,
} from 'src/@types/opportunity/address/updateAddressData';
import { opportunity } from 'src/_clients';

export default async function UpdateAddress({
  address,
  ID,
}: updateAddressRequestBodyType): Promise<updateAddressResponseType> {
  const response = await opportunity.put<
    updateAddressRequestBodyType,
    AxiosResponse<updateAddressResponseType>
  >(`/api/v1/addresses/${ID}`, address);

  return response.data;
}
