import { OpportunityData } from './opportunityData';

export type CheckDuplicateOpportunitiesResponseType = {
  statusCode: number;
  data: {
    dulicated: boolean;
    opportunity: OpportunityData;
  };
};
