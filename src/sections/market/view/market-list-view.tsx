'use client';

import React from 'react';
import { Container } from '@mui/system';
import HeaderBreadCrumbs from 'src/components/header-bread-crumbs';
import { paths } from 'src/routes/paths';
import MarketListTable from '../market-list-table';

export default function MarketListView() {
  return (
    <Container maxWidth="xl">
      <HeaderBreadCrumbs
        heading="Market List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Market', href: paths.dashboard.market },
          { name: 'Market List', href: paths.dashboard.market },
        ]}
      />
      <MarketListTable />
    </Container>
  );
}
