import { FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { UserData } from './userData';

export type UsersQueryFiltersType = {
  name?: FilterValueString;
  last_name?: FilterValueString;
  email?: FilterValueString;
  phone?: FilterValueString;
  grade?: FilterValueInt;
  id_code?: FilterValueString;
  username?: FilterValueString;
  // phone_verified_at?: Date | null;
  // email_verified_at?: Date | null;
  date_of_birth?: FilterValueString;
  gender?: FilterValueString;
  createdAt?: FilterValueString;
};

export type QueryUsersResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: UserData[];
  };
};
