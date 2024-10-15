'use client';

import { Container } from '@mui/material';
import React from 'react';
import { useContractVehiclesQuery } from 'src/_req-hooks/opportunity/vehicles/useContractVehiclesQuery';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import ContractNewEditForm from '../contract-new-edit-form';

type Props = {
  id: string;
};

export default function ContractVehiclesEditView({ id }: Props) {
  const { data: currentVehicle } = useContractVehiclesQuery({ id }, { enabled: !!id });

  const contractVehicle = currentVehicle?.data.items[0];

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Edit Contract Vehicle"
        links={[
          { name: 'Contract Vehicle', href: paths.dashboard.root },
          { name: 'Contract Vehicle', href: paths.dashboard.contractVehicle.root },
          { name: contractVehicle?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <ContractNewEditForm currentContractVehicle={contractVehicle} />
    </Container>
  );
}
