import { AxiosResponse } from 'axios';
import {
  deleteAddressesRequestBodyType,
  deleteAddressesResponseType,
} from 'src/@types/opportunity/address/deleteAddressesData';
import { opportunity } from 'src/_clients';

export default async function DeleteAddresses(
  ids: deleteAddressesRequestBodyType
): Promise<deleteAddressesResponseType> {
  const response = await opportunity.delete<
    deleteAddressesRequestBodyType,
    AxiosResponse<deleteAddressesResponseType>
  >('/api/v1/addresses', {
    data: ids,
  });

  return response.data;
}
