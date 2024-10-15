import { UserData } from './userData';

export type UpdateUserRequestBodyType = {
  user: {
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
    suspended_at: boolean;
    email_verified_at: boolean;
    phone_verified_at: boolean;
    referral_code: string;
    contributor_id: number;
    should_change_password: boolean;
    address: string;
    company_name: string;
    country: string;
    state: string;
    title: string;
    town_city: string;
    zip_code: string;
  };
  ID?: string;
};

export type UpdateUserResponseType = {
  statusCode: number;
  data: UserData;
};
