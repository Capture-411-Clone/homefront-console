'use client';

import { Button, Container, Stack } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import FiscalNewEditForm from '../fiscal-new-edit-form';

export default function FiscalNewView() {
  const router = useRouter();
  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomBreadcrumbs
          heading="New "
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Year Issued', href: paths.dashboard.fiscal_year.root },
            { name: 'New' },
          ]}
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
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
      <FiscalNewEditForm />
    </Container>
  );
}
