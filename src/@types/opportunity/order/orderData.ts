import { OpportunityData } from '../opportunity/opportunityData';

export type OrderData = {
  ID: number;
  failed_reason: string;
  opportunity: OpportunityData;
  opportunity_id: number;
  price_amount: number;
  stripe_event_id: string;
  user: string;
  user_id: number;
  refunded_at: string | null;
  paid_at: string | null;
};
