export type updateAddressRequestBodyType = {
  address: {
    full_name: string;
    phone_number: string;
    address: string;
    town_city: string;
    state: string;
    zip_code: string;
    country: string;
    default: boolean;
  };
  ID: number;
};

export type updateAddressResponseType = {};
