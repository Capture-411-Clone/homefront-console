'use client';

import { Container } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import AgencyNewEditForm from '../agency-new-edit-form';

export default function AgencyNewView() {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="New Agency"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Agency', href: paths.dashboard.agency.root },
          { name: 'New Agency' },
        ]}
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
        }}
      />
      <AgencyNewEditForm />
    </Container>
  );
}
