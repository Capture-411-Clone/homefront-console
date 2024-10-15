type CheckoutSessionData = {
  session_id: string;
  session_url: string;
};

export type CreateOpportunityOrderCheckoutSessionRequestBodyType = {
  opportunity_id: number;
  redirect_path: string;
};

export type CreateOpportunityOrderCheckoutSessionResponseType = {
  statusCode: number;
  data: CheckoutSessionData;
};
