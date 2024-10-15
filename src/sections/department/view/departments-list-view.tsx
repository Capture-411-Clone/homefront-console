'use client';

import React from 'react';
import { Container } from '@mui/system';
import HeaderBreadCrumbs from 'src/components/header-bread-crumbs';
import { paths } from 'src/routes/paths';
import DepartmentListTable from '../department-list-table';

export default function DepartmentsListView() {
  return (
    <Container maxWidth="xl">
      <HeaderBreadCrumbs
        heading="Department List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Department', href: paths.dashboard.department },
          { name: 'Department List', href: paths.dashboard.department },
        ]}
      />
      <DepartmentListTable />
    </Container>
  );
}
