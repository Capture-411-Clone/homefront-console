import { OfficeData } from './officeData';

export type UpdateOfficeRequestBodyType = {
  office: {
    parent_id: number;
    name: string;
    acronym: string;
    agency_id: number;
  };
  ID?: number;
};

export type UpdateOfficeResponseType = {
  statusCode: number;
  data: OfficeData;
};
