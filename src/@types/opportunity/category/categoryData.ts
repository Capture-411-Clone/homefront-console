import { UserData } from '../user/userData';

export type CategoryData = {
  ID: number;
  children: null;
  parent: null;
  parent_id: null;
  name: string;
  icon_url: string;
  color: string;
  user: UserData;
  user_id: number;
  rate: number;
  recipes: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: number;
};
