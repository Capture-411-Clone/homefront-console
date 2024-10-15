'use client';

import { Container } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import NaicsNewEditFrom from '../naics-new-edit-from';

export default function NaicsNewView() {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="New NAICS"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'NAICS', href: paths.dashboard.Naics.root },
          { name: 'New NAICS' },
        ]}
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
        }}
      />
      <NaicsNewEditFrom />
    </Container>
  );
}
