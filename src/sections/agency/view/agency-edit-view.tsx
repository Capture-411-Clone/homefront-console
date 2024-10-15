'use client';

import { Container } from '@mui/material';
import React from 'react';
import { useAgenciesQuery } from 'src/_req-hooks/opportunity/agency/useAgenciesQuery';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import AgencyNewEditForm from '../agency-new-edit-form';

type Props = {
  id: string;
};

export default function AgencyEditView({ id }: Props) {
  const { data: currentAgency } = useAgenciesQuery({ id }, { enabled: !!id });

  const agency = currentAgency?.data.items[0];

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Edit Agency"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Agency', href: paths.dashboard.agency.root },
          { name: agency?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <AgencyNewEditForm currentAgency={agency} />
    </Container>
  );
}
