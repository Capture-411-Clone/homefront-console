import { UserData } from '../user/userData';

export type FiscalYearData = {
  ID: number;
  user: UserData;
  user_id: number;
  year: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
