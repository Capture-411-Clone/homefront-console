import { AgencyData } from '../agency/agencyData';
import { MarketData } from '../market/marketData';
import { UserData } from '../user/userData';

export type DepartmentData = {
  ID: number;
  name: string;
  acronym: string;
  market?: MarketData;
  market_id: number;
  agencies?: AgencyData[];
  user?: UserData;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
