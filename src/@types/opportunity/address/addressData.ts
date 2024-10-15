import { UserData } from '../user/userData';

export type AddressData = {
  ID: number;
  full_name: string;
  name: string;
  phone_number: string;
  address: string;
  town_city: string;
  state: string;
  zip_code: string;
  country: string;
  default: boolean;
  user: UserData;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
