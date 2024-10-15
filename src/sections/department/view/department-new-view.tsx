'use client';

import { Container } from '@mui/system';
import React from 'react';
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import DepartmentNewEditForm from '../department-new-edit-form';

export default function DepartmentNewView() {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="New Department"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Department', href: paths.dashboard.department.root },
          { name: 'New Department' },
        ]}
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
        }}
      />
      <DepartmentNewEditForm />
    </Container>
  );
}
