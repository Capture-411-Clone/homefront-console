import { UserData } from './userData';

export type UpdateProfileRequestBodyType = {
  name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  username: string;
  address: string;
  company_name: string;
  country: string;
  gender: string;
  id_code: string;
  state: string;
  title: string;
  town_city: string;
  zip_code: string;
};

export type UpdateProfileResponseType = {
  statusCode: number;
  data: UserData;
};
