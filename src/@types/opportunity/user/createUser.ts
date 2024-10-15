import { UserData } from './userData';

export interface CreateUserRequestBodyType {
  name: string;
  email: string;
  phone: string;
  id_code: string;
  last_name: string;
  password: string;
  username: string;
  date_of_birth: string;
  gender: string;
  roles: number[];
  contributor_id: number;
  suspended_at: boolean;
  email_verified_at: boolean;
  phone_verified_at: boolean;
  should_change_password: boolean;
  referral_code: string;
  address: string;
  company_name: string;
  country: string;
  state: string;
  title: string;
  town_city: string;
  zip_code: string;
}

export type CreateUserResponseType = {
  statusCode: number;
  data: UserData;
};
