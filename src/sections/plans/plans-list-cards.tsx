import { Box, Button, ButtonGroup, Card, Divider, Grid, Stack, Typography } from '@mui/material';

import React from 'react';
import { useAuthContext } from 'src/auth/hooks';

//---------------------------------------------------------------------------------

export default function PlansListCards() {
  const { user } = useAuthContext();
  return (
    <>
      <Stack pt={4} spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle1">
            You have{' '}
            <Typography variant="subtitle1" color="primary" component="span">
              {user?.credits}
            </Typography>{' '}
            credit
            {Number(user?.credits) > 1 ? 's' : ''} left
          </Typography>

          <Button variant="text" color="primary">
            Buy More Credits
          </Button>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body1">
            You will be downgraded at{' '}
            <Typography variant="subtitle1" component="span">
              24 July 2024 to Tier One
            </Typography>{' '}
            Plan
          </Typography>

          <Button variant="text" color="error">
            Cancel Downgrade
          </Button>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="center" mt={8}>
        <ButtonGroup size="large" sx={{ p: 1, backgroundColor: 'grey.200' }}>
          <Button variant="contained">Bill Monthly</Button>
          <Button variant="outlined">Bill Anually</Button>
        </ButtonGroup>
      </Stack>

      <Grid container sx={{ mt: 2 }} spacing={4}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, backgroundColor: 'grey.200' }}>
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h3" sx={{ pb: 2 }} color="primary.dark">
                  Free
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" fontSize={18}>
                    Basic Reports
                  </Typography>
                  <Typography variant="subtitle2" fontSize={18}>
                    Discount Subscription to G2X (or Other Partners){' '}
                  </Typography>
                </Stack>
              </Box>
              <Button variant="contained" color="primary" size="large">
                Downgrade
              </Button>
            </Stack>
          </Card>
        </Grid>

        <Grid item xl={4} lg={6} md={6} sm={12} xs={12}>
          <Card component={Stack} spacing={3} sx={{ p: 3, backgroundColor: 'grey.200' }}>
            <Typography variant="h3" sx={{ pb: 1 }} color="primary.dark">
              Tier One
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h3" color="primary.dark" sx={{ fontSize: '40px !important' }}>
                500$
              </Typography>
              <Typography variant="body1" fontSize={24}>
                per month
              </Typography>
            </Stack>

            <Divider />

            <Button variant="contained" color="primary" size="large">
              Downgrade
            </Button>

            <Stack spacing={2}>
              <Typography variant="subtitle2" fontSize={18}>
                Advanced Reports
              </Typography>
              <Typography variant="subtitle2" fontSize={18}>
                Metrics
              </Typography>
              <Typography variant="subtitle2" fontSize={18}>
                Discount Subscription to G2X (or Other Partners)
              </Typography>
              <Typography variant="subtitle2" fontSize={18}>
                Extra crawler info: More form FPDS Sam.gov info. USASpending info
              </Typography>
              <Typography variant="subtitle2" fontSize={18}>
                $2000 of credit if subscribed for annual
              </Typography>
            </Stack>
          </Card>
        </Grid>

        <Grid item xl={4} lg={6} md={6} sm={12} xs={12}>
          <Card component={Stack} spacing={3} sx={{ p: 3, backgroundColor: 'grey.200' }}>
            <Typography variant="h3" sx={{ pb: 1 }} color="primary.dark">
              Tier Two
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h3" color="primary.dark" sx={{ fontSize: '40px !important' }}>
                1000$
              </Typography>
              <Typography variant="body1" fontSize={24}>
                per month
              </Typography>
            </Stack>

            <Divider />

            <Button variant="outlined" color="primary" size="large">
              Your Current Plan
            </Button>

            <Stack spacing={2}>
              <Typography variant="subtitle2" fontSize={18}>
                Tier One+
              </Typography>
              <Typography variant="subtitle2" fontSize={18}>
                Advanced Metrics
              </Typography>
              <Typography variant="subtitle2" fontSize={18}>
                Improved Request Zone (ability to mark priority, pay more for fast fulfillment)
              </Typography>
              <Typography variant="subtitle2" fontSize={18}>
                Partner Finder (potentially partnership with another company)
              </Typography>
              <Typography variant="subtitle2" fontSize={18}>
                Prop Writer Matcher (potentially partnership with another company)
              </Typography>
              <Typography variant="subtitle2" fontSize={18}>
                Free Archive Upload Service– up to 2500 $10,000 of credit if subscribed for annual
              </Typography>
            </Stack>
          </Card>
        </Grid>

        <Grid item xl={4} lg={6} md={6} sm={12} xs={12}>
          <Card component={Stack} spacing={3} sx={{ p: 3, backgroundColor: 'grey.200' }}>
            <Typography variant="h3" sx={{ pb: 1 }} color="primary.dark">
              Tier Three
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h3" color="primary.dark" sx={{ fontSize: '40px !important' }}>
                2000$
              </Typography>
              <Typography variant="body1" fontSize={24}>
                per month
              </Typography>
            </Stack>

            <Divider />

            <Button variant="contained" color="primary" size="large">
              Upgrade
            </Button>

            <Stack spacing={2}>
              <Typography variant="subtitle2" fontSize={18}>
                Tier One+
              </Typography>
              <Typography variant="subtitle2" fontSize={18}>
                Tier Two+
              </Typography>
              <Typography variant="subtitle2" fontSize={18}>
                50% discount on DRFPs & RFIs ($125 each)
              </Typography>
              <Typography variant="subtitle2" fontSize={18}>
                Free Archive Upload Service– up to 5000
              </Typography>
              <Typography variant="subtitle2" fontSize={18}>
                $20,000 of credit if subscribed for annual
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
