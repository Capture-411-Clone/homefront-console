'use client';

import { Container } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import UserNewEditForm from '../user-new-edit-form';

export default function UserNewView() {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="New User"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Users', href: paths.dashboard.user.root },
          { name: 'New User' },
        ]}
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
        }}
      />
      <UserNewEditForm />
    </Container>
  );
}
