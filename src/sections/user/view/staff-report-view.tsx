'use client';

import { Container } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import StaffReportDataGrid from '../staff-report-data-grid';

export default function StaffReportView() {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Staff Report"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Users', href: paths.dashboard.user.root },
          { name: 'Staff Report' },
        ]}
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
        }}
      />
      <StaffReportDataGrid />
    </Container>
  );
}
