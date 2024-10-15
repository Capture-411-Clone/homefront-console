import { UserData } from '../user/userData';

export type ChangePasswordRequestBodyType = {
  password: string;
  new_password: string;
};

type ChangePasswordUserDataType = {
  user: UserData;
  access_token: string;
};

export type ChangePasswordResponseType = {
  statusCode: number;
  data: ChangePasswordUserDataType;
};
