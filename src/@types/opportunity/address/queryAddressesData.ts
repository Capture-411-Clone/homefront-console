import { FilterValueString } from 'src/@types/site/filters';
import { AddressData } from './addressData';

export type AddressesQueryFiltersType = {
  title?: FilterValueString;
  createdAt?: FilterValueString;
};

export type QueryAddressesResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: AddressData[];
  };
};
