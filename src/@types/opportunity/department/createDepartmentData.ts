import { DepartmentData } from './departmentData';

export type CreateDepartmentRequestBodyType = {
  market_id: number;
  name: string;
  acronym: string;
};

export type CreateDepartmentResponseType = {
  statusCode: number;
  data: DepartmentData;
};
