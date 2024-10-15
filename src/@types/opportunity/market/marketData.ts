import { UserData } from '../user/userData';

export type MarketData = {
  ID: number;
  name: string;
  user: UserData;
  user_id: number;
  departments: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: number;
};
