'use client';

import { Container } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import ContractNewEditForm from '../contract-new-edit-form';

export const metadata = {
  title: 'New Contract Vehicles',
};

export default function ContractVehiclesNewView() {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="New Contract Vehicles"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Contract Vehicles', href: paths.dashboard.contractVehicle.root },
          { name: 'New Contract Vehicles ' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <ContractNewEditForm />
    </Container>
  );
}
