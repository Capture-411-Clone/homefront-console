'use client';

import { Container } from '@mui/system';
import React from 'react';
import HeaderBreadCrumbs from 'src/components/header-bread-crumbs';
import { paths } from 'src/routes/paths';
import AgencyListTable from '../agency-list-table';

export default function AgencyListView() {
  return (
    <Container maxWidth="xl">
      <HeaderBreadCrumbs
        heading="Agency List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Agency', href: paths.dashboard.agency },
          { name: 'Agency List', href: paths.dashboard.agency },
        ]}
      />
      <AgencyListTable />
    </Container>
  );
}
