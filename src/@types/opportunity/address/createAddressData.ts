import { AddressData } from './addressData';

export type CreateAddressRequestBodyType = {
  full_name: string;
  phone_number: string;
  address: string;
  town_city: string;
  state: string;
  zip_code: string;
  country: string;
  default: boolean;
  name: string;
};

export type CreateAddressResponseType = {
  statusCode: number;
  data: AddressData;
};
