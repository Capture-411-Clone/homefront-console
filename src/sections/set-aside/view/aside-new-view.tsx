'use client';

import { Container } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import AsideNewEditForm from '../aside-new-edit-form';

export default function AsideNewView() {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="New Set Aside"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Set Aside', href: paths.dashboard.set_aside.root },
          { name: 'New Set Aside' },
        ]}
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
        }}
      />
      <AsideNewEditForm />
    </Container>
  );
}
