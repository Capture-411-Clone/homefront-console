'use client';

import { Container } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import AsideListDataGrid from '../aside-data-grid';

export default function AsideListView() {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Set Aside List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Set Aside', href: paths.dashboard.set_aside.root },
          { name: 'Set Aside List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <AsideListDataGrid />
    </Container>
  );
}
