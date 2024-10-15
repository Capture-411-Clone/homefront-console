import { AddDocumentRequestBodyType } from './createOpportunityData';
import { OpportunityData } from './opportunityData';

export type UpdateOpportunityRequestBodyType = {
  opportunityData: {
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
    solicitation_number?: string;
    requested?: boolean;
    deprecated?: boolean;
    is_draft?: boolean;
    documents?: AddDocumentRequestBodyType[];
  };
  ID: number;
};

export type UpdateOpportunityResponseType = {
  statusCode: number;
  data: OpportunityData;
};
