import { FilterValueInt, FilterValueString } from 'src/@types/site/filters';
import { DepartmentData } from './departmentData';

export type DepartmentsQueryFiltersType = {
  similar_name?: FilterValueString;
  name?: FilterValueString;
  department_id?: FilterValueString;
  acronym?: FilterValueString;
  createdAt?: FilterValueString;
  market_id?: FilterValueInt;
};

export type QueryDepartmentResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: DepartmentData[];
  };
};
