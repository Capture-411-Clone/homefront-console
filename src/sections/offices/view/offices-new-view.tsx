'use client';

import { Container } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import OfficeNewEditForm from '../office-new-edit-form';

export default function OfficesNewView() {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="New Office"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Office', href: paths.dashboard.offices.root },
          { name: 'New Office' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <OfficeNewEditForm />
    </Container>
  );
}
