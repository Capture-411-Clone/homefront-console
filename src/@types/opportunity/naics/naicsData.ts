import { UserData } from '../user/userData';

export type NaicsData = {
  ID: number;
  user: UserData;
  user_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
