'use client';

import React from 'react';
import { Container } from '@mui/system';
import HeaderBreadCrumbs from 'src/components/header-bread-crumbs';
import { paths } from 'src/routes/paths';
import OrdersListTable from '../orders-list-table';

export default function OrdersListView() {
  return (
    <Container maxWidth="xl">
      <HeaderBreadCrumbs
        heading="Orders List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Orders', href: paths.dashboard.orders },
        ]}
      />
      <OrdersListTable />
    </Container>
  );
}
