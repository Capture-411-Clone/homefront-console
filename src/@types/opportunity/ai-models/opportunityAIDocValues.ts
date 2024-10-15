export type OpportunityGuessedData = {
  agency: string;
  contract_vehicle: string;
  department: string;
  description: string;
  naics: string;
  office: string;
  set_aside: string;
  solicitation_number: string;
  title: string;
  year: string;
};

interface OpportunityAIDocValuesResponseData {
  is_cui: boolean;
  result: OpportunityGuessedData;
  status: string;
}

export type OpportunityAIDocValuesRequest = {
  file_object_key: string;
};

export type OpportunityAIDocValuesResponseType = {
  statusCode: number;
  data: OpportunityAIDocValuesResponseData;
};
