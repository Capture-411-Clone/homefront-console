import { AgencyData } from './agencyData';

export type UpdateAgencyRequestBodyType = {
  agency: { acronym: string; name: string; department_id: number };
  ID: number;
};

export type UpdateAgencyResponseType = {
  statusCode: number;
  data: AgencyData;
};
