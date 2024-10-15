import { AgencyData } from './agencyData';

export type CreateAgencyRequestBodyType = {
  acronym: string;
  name: string;
  department_id: number;
};

export type CreateAgencyResponseType = {
  statusCode: number;
  data: AgencyData;
};
