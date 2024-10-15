type ResultEntity = {
  sentence: string;
  value: string;
};

export type OpportunityAIAllDocValuesResult = {
  TITLE: ResultEntity[];
  DESCRIPTION: ResultEntity[];
  SOLICITATION_NUMBER: ResultEntity[];
  DEPARTMENT: ResultEntity[];
  AGENCY: ResultEntity[];
  OFFICE: ResultEntity[];
  CONTRACT_VEHICLE: ResultEntity[];
  SET_ASIDE: ResultEntity[];
  FISCAL_YEAR: ResultEntity[];
  NAICS: ResultEntity[];
};

interface OpportunityAIAllDocValuesResponseData {
  status: string;
  is_cui: boolean;
  result: OpportunityAIAllDocValuesResult;
}

export type OpportunityAIAllDocValuesRequest = {
  file_object_key: string;
};

export type OpportunityAIAllDocValuesResponseType = {
  statusCode: number;
  data: OpportunityAIAllDocValuesResponseData;
};
