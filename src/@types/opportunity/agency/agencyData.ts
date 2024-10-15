import { DepartmentData } from '../department/departmentData';
import { OfficeData } from '../office/officeData';
import { UserData } from '../user/userData';

export type AgencyData = {
  ID: number;
  name: string;
  acronym: string;
  department?: DepartmentData;
  department_id: number;
  offices?: OfficeData[];
  user?: UserData;
  user_id: 1;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
