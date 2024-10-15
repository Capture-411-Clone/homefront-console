'use client';

// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
// components
import { useSettingsContext } from 'src/components/settings';
//
import { useOpportunityQuery } from 'src/_req-hooks/opportunity/opportunity/useOpportunityQuery';
//
import EcommerceYearlySalesVsWishlist from '../ecommerce-yearly-sales-vs-wishlist';
import EcommerceSaleByMarket from '../ecommerce-sale-by-market';
import EcommerceSalesOverviewByTier, { ItemProps } from '../ecommerce-sales-overview-by-tier';
import EcommerceWidgetSummary from '../ecommerce-widget-summary';
import EcommerceCurrentBalance from '../ecommerce-current-balance';

// ----------------------------------------------------------------------

export default function OverviewFinanceView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  const tempTierData: ItemProps[] = [
    {
      label: '$250',
      value: 0,
      totalAmount: 0,
    },
    {
      label: '$1,000',
      value: 0,
      totalAmount: 0,
    },
    {
      label: '$1,500',
      value: 0,
      totalAmount: 0,
    },
    {
      label: '$2,000',
      value: 0,
      totalAmount: 0,
    },
    {
      label: '$2,500',
      value: 0,
      totalAmount: 0,
    },
    {
      label: 'Total Sales',
      value: 0,
      totalAmount: 0,
    },
  ];

  const { data } = useOpportunityQuery({
    page: 1,
    order: 'desc',
    order_by: 'id',
    per_page: 1, // Adjust if necessary
    mine_only: 'true',
    filters: {
      requested: { op: 'equals', value: 'false' },
    },
  });

  const totalContributions = data?.data.totalRows || 0;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            noTrending
            noChart
            title="Your Contributions Count"
            percent={2.6}
            total={totalContributions}
            chart={{
              series: [0],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            noChart
            noTrending
            title="Your Contributions Purchased by Others"
            percent={-0.1}
            total={0}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            noTrending
            noChart
            title="Quarterly Earnings"
            percent={0.6}
            total={0}
            preTotalChar="$"
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [40, 70, 75, 70, 50, 28, 7, 64, 38, 27],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <EcommerceSaleByMarket
            title="Sale By Market"
            total={0}
            chart={{
              series: [
                { label: 'Civilain', value: 0 },
                { label: 'Defense', value: 0 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <EcommerceYearlySalesVsWishlist
            title="Sales and Your Contributions in Users’ Wishlist"
            subheader=""
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  year: '2024',
                  data: [
                    {
                      name: 'Sales',
                      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                      name: 'Wishlist',
                      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <EcommerceSalesOverviewByTier title="Sales Overview By Tier" data={tempTierData} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <EcommerceCurrentBalance title="Current Balance" currentBalance={0} />
        </Grid>
      </Grid>
    </Container>
  );
}
