'use client';

import { Button, Container, Stack } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import OpportunityWishListDataGrid from '../opportunity-wish-list-data-grid';

export default function OpportunityWishListView() {
  const router = useRouter();
  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomBreadcrumbs
          heading="Wish List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Opportunity', href: paths.dashboard.opportunity.root },
            { name: 'Wish List' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Button
          size="large"
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => router.push(paths.dashboard.opportunity.new)}
        >
          New Opportunity
        </Button>
      </Stack>
      <OpportunityWishListDataGrid />
    </Container>
  );
}
