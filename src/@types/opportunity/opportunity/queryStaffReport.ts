import { FilterValueString } from 'src/@types/site/filters';
import { StaffReportResponseData } from './staffReportData';

export type StaffReportQueryFiltersType = {
  email?: FilterValueString;
};

export type QueryStaffReportResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: StaffReportResponseData[];
  };
};
