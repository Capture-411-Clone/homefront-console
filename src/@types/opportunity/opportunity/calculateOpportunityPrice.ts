type PriceData = {
  price: number;
  prefix: string;
  currency: string;
};

export type CalculateOpportunityPriceRequestBodyType = {
  ID: number;
};

export type CalculateOpportunityPriceResponseType = {
  statusCode: number;
  data: PriceData;
};
