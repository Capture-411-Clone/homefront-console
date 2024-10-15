import { OpportunityData } from './opportunityData';

export type AddDocumentRequestBodyType = {
  file_path: string;
  mainFile: File | null;
  ID?: number;
  title?: string;
  user_id?: number;
  staff_id?: number;
};

export type CreateOpportunityRequestBodyType = {
  title?: string;
  description?: string;
  user_contract_value?: string;
  user_knows_contract_value?: boolean;
  approved?: boolean;
  market: string;
  department: string;
  agency: string;
  office: string;
  naics: string;
  fiscal_year: string;
  set_aside: string;
  contract_vehicle: string;
  documents?: AddDocumentRequestBodyType[];
  requested?: boolean;
  is_draft?: boolean;
  deprecated?: boolean;
  solicitation_number?: string;
};

export type CreateOpportunityResponseType = {
  statusCode: number;
  data: OpportunityData;
};
