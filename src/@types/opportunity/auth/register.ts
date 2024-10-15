import { UserData } from '../user/userData';

export type RegisterRequestBodyType = {
  name: string;
  last_name: string;
  email: string;
  password: string;
  session_code: string;
  referred_with_code: string;
  biography?: string;
  invite_code?: string;
  phone?: string;
};

export type RegisterResponseDataType = {
  statusCode: number;
  data: { user: UserData; access_token: string };
};
