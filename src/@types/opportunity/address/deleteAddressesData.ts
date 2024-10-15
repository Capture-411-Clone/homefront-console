export type deleteAddressesRequestBodyType = { ids: string };

export type deleteAddressesResponseType = {
  statusCode: number;
  data: {
    ids: string;
  };
};
