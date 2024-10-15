'use client';

import { Container } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import FiscalListDataGrid from '../fiscal-list-data-grid';

export default function FiscalListView() {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Year List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Year', href: paths.dashboard.fiscal_year.root },
          { name: 'Year List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <FiscalListDataGrid />
    </Container>
  );
}
