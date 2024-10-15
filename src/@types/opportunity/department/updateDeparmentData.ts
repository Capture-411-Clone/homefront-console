import { DepartmentData } from './departmentData';

export type UpdateDeparmentRequestBodyType = {
  department: { market_id: number; name: string; acronym: string };
  ID: number;
};

export type UpdateDepartmentResponseType = {
  statusCode: number;
  data: DepartmentData;
};
