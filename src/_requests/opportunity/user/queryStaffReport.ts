import { AxiosResponse } from 'axios';
import {
  QueryStaffReportResponseType,
  StaffReportQueryFiltersType,
} from 'src/@types/opportunity/opportunity/queryStaffReport';
import { opportunity } from 'src/_clients';

export default async function QueryStaffReport(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  query: string,
  filters: StaffReportQueryFiltersType
): Promise<QueryStaffReportResponseType> {
  const response = await opportunity.get<void, AxiosResponse<QueryStaffReportResponseType>>(
    `/api/v1/opportunities/staff-report`,
    {
      params: {
        id,
        page,
        per_page,
        order,
        order_by,
        query,
        filters: JSON.stringify(filters),
      },
    }
  );

  return response.data;
}
