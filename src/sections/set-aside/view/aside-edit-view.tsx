'use client';

import { Container } from '@mui/material';
import React from 'react';
import { useSetAsideQuery } from 'src/_req-hooks/opportunity/set-aside/useGetSetAsideQuery';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import AsideNewEditForm from '../aside-new-edit-form';

type Props = {
  id: string;
};

export default function AsideEditView({ id }: Props) {
  const { data: currentAside } = useSetAsideQuery({ id }, { enabled: !!id });
  const setAside = currentAside?.data.items[0];

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Edit Set Aside"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Set Aside', href: paths.dashboard.set_aside.root },
          { name: setAside?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <AsideNewEditForm currentAsde={setAside} />
    </Container>
  );
}
