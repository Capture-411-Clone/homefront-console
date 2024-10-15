import { AxiosResponse } from 'axios';
import {
  AddressesQueryFiltersType,
  QueryAddressesResponseType,
} from 'src/@types/opportunity/address/queryAddressesData';
import { opportunity } from 'src/_clients';

export default async function QueryAddresses(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  filters: AddressesQueryFiltersType
): Promise<QueryAddressesResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await opportunity.get<void, AxiosResponse<QueryAddressesResponseType>>(
    `/api/v1/addresses`,
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
