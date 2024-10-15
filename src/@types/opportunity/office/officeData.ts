import { AgencyData } from '../agency/agencyData';
import { UserData } from '../user/userData';

export type OfficeData = {
  ID: number;
  name: string;
  acronym: string;
  children?: [];
  parent?: null;
  parent_id?: null;
  agency?: AgencyData;
  agency_id: number;
  user?: UserData;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
