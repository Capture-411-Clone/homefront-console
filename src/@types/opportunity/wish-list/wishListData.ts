import { OpportunityData } from '../opportunity/opportunityData';
import { UserData } from '../user/userData';

export type WishListData = {
  ID: number;
  user: UserData;
  user_id: number;
  opportunity: OpportunityData;
  opportunity_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
