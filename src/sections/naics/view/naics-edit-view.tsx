'use client';

import { Container } from '@mui/material';
import React from 'react';
import { useNaicsQuery } from 'src/_req-hooks/opportunity/naics/useGetNaicsQuery';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import NaicsNewEditFrom from '../naics-new-edit-from';

type Props = {
  id: string;
};
export default function NaicsEditView({ id }: Props) {
  const { data: currentNaics } = useNaicsQuery({ id }, { enabled: !!id });

  const Naics = currentNaics?.data.items[0];

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Edit NAICS"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'NAICS', href: paths.dashboard.Naics.root },
          { name: Naics?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <NaicsNewEditFrom currentNaics={Naics} />
    </Container>
  );
}
