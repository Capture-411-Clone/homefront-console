import { OfficeData } from './officeData';

export type CreateOfficeRequestBodyType = {
  parent_id: number;
  name: string;
  acronym: string;
  agency_id: number;
};

export type CreateOfficeResponseType = {
  statusCode: number;
  data: OfficeData;
};
