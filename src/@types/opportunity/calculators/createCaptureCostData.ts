export type CreateCaptureCostRequestBodyType = {
  annual_pipeline_time: number;
  company_name: string;
  email: string;
  full_name: string;
  hourly_rate: number;
  manager_count: number;
  company_annual_cost: number;
  company_capture411_cost: number;
  company_hours_saved: number;
  company_savings: number;
};

export type CreateCaptureCostResponseType = {
  statusCode: number;
  data: {
    ID: number;
    company_name: string;
    full_name: string;
    email: string;
    manager_count: number;
    hourly_rate: number;
    annual_pipeline_time: number;
    company_annual_cost: number;
    company_capture411_cost: number;
    company_hours_saved: number;
    company_savings: number;
    created_at: Date;
    updated_at: Date;
  };
};
