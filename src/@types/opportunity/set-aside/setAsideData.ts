import { UserData } from '../user/userData';

export type SetAsideData = {
  ID: number;
  user: UserData;
  user_id: number;
  name: string;
  acronym: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
