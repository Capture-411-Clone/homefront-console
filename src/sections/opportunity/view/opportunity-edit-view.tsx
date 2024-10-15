'use client';

import React, { useEffect } from 'react';
import { Button, Container, Stack } from '@mui/material';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useOpportunityQuery } from 'src/_req-hooks/opportunity/opportunity/useOpportunityQuery';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useDispatch } from 'src/redux/store';
import {
  currentOpportunityIdChanged,
  opportunityGuessedDataReseted,
} from 'src/redux/slices/opportunity';

import OpportunityNewEditForm from '../opportunity-new-edit-form';

type Props = {
  id: string;
};
export default function OpportunityEditView({ id }: Props) {
  const dispatch = useDispatch();

  dispatch(currentOpportunityIdChanged(Number(id)));

  const { data: currentOpportunity, refetch } = useOpportunityQuery({ id }, { enabled: !!id });

  useEffect(
    () => () => {
      dispatch(opportunityGuessedDataReseted());

      dispatch(currentOpportunityIdChanged(0));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const router = useRouter();
  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomBreadcrumbs
          heading="Edit Opportunity"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Opportunity', href: paths.dashboard.opportunity.root },
            { name: currentOpportunity?.data?.items?.[0]?.title },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push(paths.dashboard.opportunity.root)}
        >
          Return to The Opportunity List
        </Button>
      </Stack>
      <OpportunityNewEditForm
        isEdit={!!id}
        refetchOpportunity={refetch}
        currentOpportunity={currentOpportunity?.data?.items[0]}
      />
    </Container>
  );
}
