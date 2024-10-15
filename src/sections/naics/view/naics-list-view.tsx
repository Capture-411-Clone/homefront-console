'use client';

import { Container } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import NaicsListDataGrid from '../naics-list-data-grid';

export default function NaicsListView() {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="NAICs List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'NAICs', href: paths.dashboard.Naics.root },
          { name: 'NAICs List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <NaicsListDataGrid />
    </Container>
  );
}
