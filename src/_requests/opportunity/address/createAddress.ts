import { AxiosResponse } from 'axios';
import {
  CreateAddressRequestBodyType,
  CreateAddressResponseType,
} from 'src/@types/opportunity/address/createAddressData';
import { opportunity } from 'src/_clients';

export default async function CreateAddress(
  address: CreateAddressRequestBodyType
): Promise<CreateAddressResponseType> {
  const response = await opportunity.post<
    CreateAddressRequestBodyType,
    AxiosResponse<CreateAddressResponseType>
  >(`/api/v1/addresses`, address);

  return response.data;
}
