'use client';

import { Button, Container, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useDispatch, useSelector } from 'src/redux/store';
import {
  createOpportunityActiveStepChanged,
  currentOpportunityIdChanged,
  currentOpportunityIdSelector,
} from 'src/redux/slices/opportunity';
import { useOpportunityQuery } from 'src/_req-hooks/opportunity/opportunity/useOpportunityQuery';

import { CreateOpportunitySteps } from 'src/@types/redux/opportunity';
import OpportunityNewEditForm from '../opportunity-new-edit-form';

export default function OpportunityNewView() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(
    () => () => {
      dispatch(currentOpportunityIdChanged(0));
      dispatch(createOpportunityActiveStepChanged(CreateOpportunitySteps[0]));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const currentOpportunityId = useSelector(currentOpportunityIdSelector);

  const { data: currentOpportunity, refetch } = useOpportunityQuery(
    { id: currentOpportunityId.toString() },
    { enabled: !!currentOpportunityId }
  );

  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomBreadcrumbs
          heading="New Opportunity"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Opportunity', href: paths.dashboard.opportunity.root },
            { name: 'New Opportunity' },
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

      <OpportunityNewEditForm
        currentOpportunity={currentOpportunity?.data.items[0]}
        refetchOpportunity={refetch}
      />
    </Container>
  );
}
