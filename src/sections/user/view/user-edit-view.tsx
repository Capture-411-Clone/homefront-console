'use client';

import { Container } from '@mui/material';
import React from 'react';
import { useUsersQuery } from 'src/_req-hooks/opportunity/user/useUsersQuery';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import UserNewEditForm from '../user-new-edit-form';

type Props = {
  id: string;
};

export default function UserEditView({ id }: Props) {
  const { data: currentUser } = useUsersQuery({ id }, { enabled: !!id });
  const user = currentUser?.data.items[0];

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Edit Users"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Users', href: paths.dashboard.user.root },
          { name: user?.email },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <UserNewEditForm currentUser={user} />
    </Container>
  );
}
