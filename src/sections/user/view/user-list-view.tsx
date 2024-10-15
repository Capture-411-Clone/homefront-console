'use client';

import React from 'react';
import { Container, Stack } from '@mui/system';
import HeaderBreadCrumbs from 'src/components/header-bread-crumbs';
import { paths } from 'src/routes/paths';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import UserDataGrid from '../user-data-grid';

export default function UserListView() {
  const router = useRouter();
  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderBreadCrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Users', href: paths.dashboard.user.root },
            { name: 'User List', href: paths.dashboard.user.root },
          ]}
        />
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => router.push(paths.dashboard.user.new)}
        >
          New User
        </Button>
      </Stack>
      <UserDataGrid />
    </Container>
  );
}
