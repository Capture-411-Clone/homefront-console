'use client';

import { Button, Container, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import NewFormCard from 'src/components/new-form-card';
import { opportunityGuessedDataReseted } from 'src/redux/slices/opportunity';
import { useDispatch } from 'src/redux/store';
import OpportunityNewEditInformation from '../opportunity-new-edit-steps/opportunity-new-edit-information';

export default function OpportunityRequestView() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(
    () => {
      dispatch(opportunityGuessedDataReseted());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomBreadcrumbs
          heading="Request New Opportunity"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Opportunity', href: paths.dashboard.opportunity.root },
            { name: 'Request New Opportunity' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => router.push(paths.dashboard.opportunity.root)}
        >
          Return to The Opportunity List
        </Button>
      </Stack>
      <NewFormCard title="New Request" noSubmitButton>
        <OpportunityNewEditInformation documents={[]} requestMode />
      </NewFormCard>
    </Container>
  );
}
