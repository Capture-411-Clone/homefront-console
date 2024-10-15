'use client';

import { Button, Container } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { Stack } from '@mui/system';
import PlansListCards from '../plans-list-cards';

export default function NaicsListView() {
  const goToStripePortal = () => {
    window.open('https://dashboard.stripe.com/test/login', '_blank');
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomBreadcrumbs
          heading="Plans"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Plans', href: paths.dashboard.plans.list },
            { name: 'Plans List' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Button size="medium" variant="contained" color="primary" onClick={goToStripePortal}>
          Open Protal Session
        </Button>
      </Stack>
      <PlansListCards />
    </Container>
  );
}
