'use client';

import { Button, Container, Stack } from '@mui/material';
import React from 'react';
import { useFiscalYearQuery } from 'src/_req-hooks/opportunity/fiscal-year/useFiscalYearQuery';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import FiscalNewEditForm from '../fiscal-new-edit-form';

type Props = {
  id: string;
};

export default function FiscalEditView({ id }: Props) {
  const { data: currentFiscalYear } = useFiscalYearQuery({ id }, { enabled: !!id });
  const router = useRouter();

  const fiscalYear = currentFiscalYear?.data.items[0];

  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomBreadcrumbs
          heading="Edit "
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Year', href: paths.dashboard.fiscal_year.root },
            { name: fiscalYear?.year },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={() => router.push(paths.dashboard.fiscal_year.root)}
        >
          Return to The Year List
        </Button>
      </Stack>
      <FiscalNewEditForm currentFiscalYear={fiscalYear} />
    </Container>
  );
}
