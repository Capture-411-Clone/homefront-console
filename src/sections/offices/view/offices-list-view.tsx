'use client';

import React from 'react';
import { Container } from '@mui/system';
import HeaderBreadCrumbs from 'src/components/header-bread-crumbs';
import { paths } from 'src/routes/paths';
import OfficeListTable from '../office-list-table';

export default function OfficesListView() {
  return (
    <Container maxWidth="xl">
      <HeaderBreadCrumbs
        heading="Office List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Offices', href: paths.dashboard.offices },
          { name: 'Office List', href: paths.dashboard.offices },
        ]}
      />
      <OfficeListTable />
    </Container>
  );
}
