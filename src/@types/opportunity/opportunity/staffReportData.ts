import { UserData } from '../user/userData';

export type StaffReportResponseData = {
  user: UserData;
  contribution_count: number;
  last_login_at: string;
};
