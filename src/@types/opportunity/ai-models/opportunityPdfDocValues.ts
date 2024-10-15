export interface OpportunityPdfGptChoiceValues {
  title: string;
  description: string;
  department: string;
  agency: string;
  office: string;
  naics: string;
  contract_vehicle: string;
  set_aside: string;
  year: string;
  solicitation_number: string;
}

export type UploadOpportunityPdfFileRequestBodyType = {
  files: any[];
};

export type OpportunityPdfDocValuesResponseType = {
  statusCode: number;
  data: OpportunityPdfGptChoiceValues;
};
