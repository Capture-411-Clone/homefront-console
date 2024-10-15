// sections
// import ComingSoonView from 'src/sections/coming-soon/view';
import { Box } from '@mui/material';
import OverviewFinanceView from 'src/sections/overview/finance/view/overview-finance-view';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Capture411',
};

export default function OverviewAppPage() {
  return (
    <Box py={5} px={10}>
      <OverviewFinanceView />
    </Box>
  );
}
