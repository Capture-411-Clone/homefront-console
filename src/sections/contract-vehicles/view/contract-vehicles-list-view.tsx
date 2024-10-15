'use client';

import { Container } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import ContractListDataGrid from '../contract-list-data-grid';

export default function ContractVehiclesListView() {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Contract Vehicles List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Contract Vehicles', href: paths.dashboard.contractVehicle.root },
          { name: 'Contract Vehicles List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <ContractListDataGrid />
    </Container>
  );
}
