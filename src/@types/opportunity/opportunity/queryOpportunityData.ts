import { FilterValueString } from 'src/@types/site/filters';
import { OpportunityData } from './opportunityData';

export type OpportunitiesQueryFiltersType = {
  title?: FilterValueString;
  requested?: FilterValueString;
  market_id?: FilterValueString;
  department_id?: FilterValueString;
  agency_id?: FilterValueString;
  Office_id?: FilterValueString;
  naics_id?: FilterValueString;
  fiscal_year_id?: FilterValueString;
  set_aside_id?: FilterValueString;
  vehicle_id?: FilterValueString;
  user_contract_value?: FilterValueString;
  crawler_contract_value?: FilterValueString;
  multi_award?: FilterValueString;
  solicitation_number?: FilterValueString;
  createdAt?: FilterValueString;
  value?: FilterValueString;
};

export type QueryOpportunitiesResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: OpportunityData[];
  };
};
