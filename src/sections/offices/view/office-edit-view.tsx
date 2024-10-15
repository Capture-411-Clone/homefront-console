'use client';

import { Container } from '@mui/system';
import React from 'react';
import { useOfficesQuery } from 'src/_req-hooks/opportunity/office/useGetAllofficesQuery';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import OfficeNewEditForm from '../office-new-edit-form';

type Props = {
  id: string;
};

export default function OfficeEditView({ id }: Props) {
  const { data: currentOffice } = useOfficesQuery({ id }, { enabled: !!id });

  const office = currentOffice?.data.items[0];

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Edit Opportunity"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Opportunity', href: paths.dashboard.opportunity.root },
          { name: office?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <OfficeNewEditForm currentOffice={office} />
    </Container>
  );
}
