import { UserData } from '../user/userData';

export type DocumentData = {
  ID: number;
  created_at: Date;
  deleted_at: Date;
  file_path: string;
  link_type: string;
  owner_id: number;
  owner_type: string;
  priority: number;
  title: string;
  updated_at: Date;
  user_id: number;
  user: UserData;
  mainFile: File | null;
};
