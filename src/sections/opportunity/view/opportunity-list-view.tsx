'use client';

import { Button, Container, LinearProgress, Stack, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import React, { useCallback, useEffect, useState } from 'react';
import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import IOSSwitch from 'src/components/switch/ios-switch';
import { useAuthContext } from 'src/auth/hooks';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Link from 'next/link';
import OpportunityListDataGrid from '../opportunity-list-data-grid';
import OpportunityListCards from '../opportunity-list-cards';
import OpportunityWishListDataGrid from '../opportunity-wish-list-data-grid';
import OpportunityListProgress from '../opportunity-list-progress';

enum OpportunityListTabsEnum {
  All = '1',
  Requests = '2',
  MyWishes = '3',
  MyPipeline = '4',
  MyContributions = '5',
}

export default function OpportunityListView() {
  const { user } = useAuthContext();
  const userRoles = user?.roles;
  const isAdmin = !!userRoles?.find((role) => role.title === 'Admin');
  const isReviewer = !!userRoles?.find((role) => role.title === 'Reviewer');

  const [tab, setTab] = React.useState(OpportunityListTabsEnum.All);
  const router = useRouter();

  const [cardView, setCardView] = useState<boolean | null>(null);
  const [paymentResultDialogOpen, setPaymentResultDialogOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const urlTab = searchParams.get('tab');
  const paymentStatus = searchParams.get('payment-status');

  useEffect(() => {
    if (urlTab) {
      setTab(urlTab as OpportunityListTabsEnum);
    }
  }, [urlTab]);

  const handleChangeView = () => {
    setCardView((prev) => !prev);
  };

  const handleChange = (_: React.SyntheticEvent, newValue: OpportunityListTabsEnum) => {
    setTab(newValue);
    router.push(`${paths.dashboard.opportunity.root}?tab=${newValue}`);
  };

  // persist the view mode
  useEffect(() => {
    if (cardView !== null) {
      localStorage.setItem('opportunity_view', cardView.toString());
    }

    const view = localStorage.getItem('opportunity_view');
    if (view) {
      setCardView(view === 'true');
    }
  }, [cardView]);

  // const { data } = useContributionsStateQuery();
  // const progressPercent = data?.data.progressPercent || 0;
  const progressPercent = 100;

  // make 100% represents as 1 to 8 number
  const calcCircleValue = useCallback(
    (percent: number): number => Math.min(Math.ceil(percent / (100 / 8)), 8) || 1,
    []
  );

  const getPercentSentences = useCallback(
    (percent: number): React.ReactNode => {
      if (percent <= 10) {
        return (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            {percent}% of the database is filled. Keep{' '}
            <Typography component="b" variant="subtitle1">
              contributing
            </Typography>{' '}
            so the buying can begin!
          </Typography>
        );
      }

      if (percent <= 49) {
        return (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            {percent}% of the database is filled! Your{' '}
            <Typography component="b" variant="subtitle1">
              contributions
            </Typography>{' '}
            are making a difference. We’re almost halfway there to seeing the database!
          </Typography>
        );
      }

      if (percent <= 75) {
        return (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            {percent}% of the database is filled! Your{' '}
            <Typography component="b" variant="subtitle1">
              contributions
            </Typography>{' '}
            are almost ready for industry to see and purchase!
          </Typography>
        );
      }

      if (percent <= 95) {
        return (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            {percent}% of the database is filled! Industry can’t wait to start buying your{' '}
            <Typography component="b" variant="subtitle1">
              contributions
            </Typography>{' '}
            ! You’ve got this! Unveiling the database is so close…
          </Typography>
        );
      }

      if (percent <= 99) {
        return (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            {percent}% of the database is filled! You’re amazing! Keep your{' '}
            <Typography component="b" variant="subtitle1">
              contributions
            </Typography>{' '}
            coming! We will unveil the database very soon…
          </Typography>
        );
      }

      return (
        <Typography variant="body1">
          {percent}% of the database is filled! You’re amazing! Keep your{' '}
          <Typography component="b" variant="subtitle1">
            contributions
          </Typography>{' '}
          coming! We will unveil the database very soon…
        </Typography>
      );
    },

    []
  );

  const closePaymentResultDialog = useCallback(() => {
    router.push(`${paths.dashboard.opportunity.root}?tab=${urlTab}`);
  }, [router, urlTab]);

  useEffect(() => {
    if (paymentStatus) {
      setPaymentResultDialogOpen(true);
    } else {
      setPaymentResultDialogOpen(false);
    }
  }, [paymentStatus]);

  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomBreadcrumbs
          heading=" List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Opportunity', href: paths.dashboard.opportunity.root },
            { name: ' List' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Button
          sx={{
            animation: 'pulsing 1300ms infinite',
            '@keyframes pulsing': {
              '0%': { opacity: 0.6 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.6 },
            },
          }}
          size="large"
          variant="contained"
          color="primary"
          onClick={() => router.push(paths.dashboard.opportunity.new)}
        >
          Contribute
        </Button>
      </Stack>

      {progressPercent < 100 && (
        <Container maxWidth="xl">
          <Stack justifyContent="center" alignItems="center" spacing={1} mb={4}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify
                color="info.main"
                icon={`ri:progress-${calcCircleValue(progressPercent)}-line`}
                width={30}
                height={30}
              />
              <Stack>{getPercentSentences(progressPercent)}</Stack>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1} width="100%">
              <Typography>{progressPercent}%</Typography>
              <LinearProgress
                color="info"
                variant="determinate"
                value={progressPercent}
                sx={{ width: '100%', height: 18 }}
              />
              <Typography>100%</Typography>
            </Stack>
          </Stack>
        </Container>
      )}

      <TabContext value={tab}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <TabList onChange={handleChange}>
            <Tab
              label={
                <Stack direction="row" alignItems="center">
                  <Iconify
                    icon="solar:bill-list-bold"
                    width={24}
                    height={24}
                    color={tab === '1' ? 'common.black' : 'text.secondary'}
                    sx={{ mr: 1 }}
                  />
                  Buy List
                </Stack>
              }
              value={OpportunityListTabsEnum.All}
            />
            <Tab
              label={
                <Stack direction="row" alignItems="center">
                  <Iconify
                    icon="f7:question-square-fill"
                    width={24}
                    height={24}
                    color={tab === '2' ? 'common.black' : 'text.secondary'}
                    sx={{ mr: 1 }}
                  />
                  Requested
                </Stack>
              }
              value={OpportunityListTabsEnum.Requests}
            />
            <Tab
              label={
                <Stack direction="row" alignItems="center">
                  <Iconify
                    icon="solar:heart-bold"
                    width={24}
                    height={24}
                    color={tab === '3' ? 'common.black' : 'text.secondary'}
                    sx={{ mr: 1 }}
                  />
                  My Wishes
                </Stack>
              }
              value={OpportunityListTabsEnum.MyWishes}
            />
            <Tab
              label={
                <Stack direction="row" alignItems="center">
                  <Iconify
                    icon="solar:wad-of-money-bold"
                    width={24}
                    height={24}
                    color={tab === '4' ? 'common.black' : 'text.secondary'}
                    sx={{ mr: 1 }}
                  />
                  My Pipeline
                </Stack>
              }
              value={OpportunityListTabsEnum.MyPipeline}
            />
            <Tab
              label={
                <Stack direction="row" alignItems="center">
                  <Iconify
                    icon="fluent:person-edit-24-filled"
                    width={24}
                    height={24}
                    color={tab === '5' ? 'common.black' : 'text.secondary'}
                    sx={{ mr: 1 }}
                  />
                  My Contributions
                </Stack>
              }
              value={OpportunityListTabsEnum.MyContributions}
            />
          </TabList>
          {OpportunityListTabsEnum.MyWishes !== tab && (
            <IOSSwitch label="Card View" checked={!!cardView} onChange={handleChangeView} />
          )}
        </Stack>
        <TabPanel value={OpportunityListTabsEnum.All} sx={{ p: 0, py: 3 }}>
          {isAdmin || isReviewer || progressPercent >= 100 ? (
            <> {cardView ? <OpportunityListCards /> : <OpportunityListDataGrid />}</>
          ) : (
            <OpportunityListProgress />
          )}
        </TabPanel>
        <TabPanel value={OpportunityListTabsEnum.Requests} sx={{ p: 0, py: 3 }}>
          {cardView ? (
            <OpportunityListCards requestMode />
          ) : (
            <OpportunityListDataGrid requestMode />
          )}
        </TabPanel>
        <TabPanel value={OpportunityListTabsEnum.MyWishes} sx={{ p: 0, py: 3 }}>
          <OpportunityWishListDataGrid />
        </TabPanel>
        <TabPanel value={OpportunityListTabsEnum.MyPipeline} sx={{ p: 0, py: 3 }}>
          {cardView ? (
            <OpportunityListCards requestMode={false} myPipeline />
          ) : (
            <OpportunityListDataGrid myPipeline />
          )}
        </TabPanel>
        <TabPanel value={OpportunityListTabsEnum.MyContributions} sx={{ p: 0, py: 3 }}>
          {cardView ? (
            <OpportunityListCards requestMode={false} onlyOwner />
          ) : (
            <OpportunityListDataGrid onlyOwner />
          )}
        </TabPanel>
      </TabContext>

      <ConfirmDialog
        open={paymentResultDialogOpen}
        cancelBtnText="Dismiss"
        title={paymentStatus === 'success' ? 'Payment Successful' : 'Payment Failed'}
        onClose={closePaymentResultDialog}
        content={
          <Stack alignItems="center" spacing={4}>
            {paymentStatus === 'success' ? (
              <Iconify
                width={100}
                icon="icon-park-twotone:doc-success"
                sx={{
                  color: (theme) => theme.palette.success.main,
                }}
              />
            ) : (
              <Iconify
                width={100}
                icon="icon-park-twotone:doc-fail"
                sx={{
                  color: (theme) => theme.palette.error.main,
                }}
              />
            )}
            <Typography variant="body1">
              {paymentStatus === 'success' &&
                'Your Payment was Successful. Checkout Your pipeline to see the opportunity and download your files.'}
              {paymentStatus === 'fail' && (
                <>
                  Your Payment was Failed. Please try again later. Please{' '}
                  <Link href={paths.contact}>Contact us</Link> If the problem persists.
                </>
              )}
            </Typography>
          </Stack>
        }
      />
    </Container>
  );
}
