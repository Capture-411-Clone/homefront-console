export type CreatePassiveRevenueRequestBodyType = {
  company_name: string;
  email: string;
  full_name: string;
  level_five_count: number;
  level_four_count: number;
  level_one_count: number;
  level_three_count: number;
  level_two_count: number;
};

export type CreatePassiveRevenueResponseType = {
  statusCode: number;
  data: {
    ID: number;
    company_name: string;
    full_name: string;
    email: string;
    level_five_count: number;
    level_four_count: number;
    level_one_count: number;
    level_three_count: number;
    level_two_count: number;
  };
};
