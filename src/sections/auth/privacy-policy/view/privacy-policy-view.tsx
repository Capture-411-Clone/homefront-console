'use client';

import { Box, Button, Checkbox, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'src/routes/hooks';
import React, { UIEvent, useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import Scrollbar from 'src/components/scrollbar';
import { useApprovePolicyMutation } from 'src/_req-hooks/opportunity/user/useApprovePolicyMutation';
import { paths } from 'src/routes/paths';
import { TextDoc } from '../privacy-policy-text-file';

export default function PrivacyPolicyView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { logout, initialize } = useAuthContext();

  const [item1Checked, setItem1Checked] = useState(false);
  const [item2Checked, setItem2Checked] = useState(false);
  const [item3Checked, setItem3Checked] = useState(false);

  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(true);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    console.log(scrollHeight, scrollTop, clientHeight);
    if (scrollHeight - scrollTop === clientHeight) {
      setHasScrolledToEnd(true);
    }
  };

  const [loading, setLoading] = useState(false);

  const { mutateAsync: approvePolicy } = useApprovePolicyMutation();
  const acceptPrivacyPolicy = async () => {
    try {
      setLoading(true);
      await approvePolicy();
      enqueueSnackbar('Privacy policy accepted', { variant: 'success' });
      await initialize();
      setLoading(false);
      router.push(paths.dashboard.root);
    } catch (error) {
      setLoading(false);
      console.log(error);
      enqueueSnackbar('Error accepting privacy policy. Contact Support', {
        variant: 'error',
      });
      router.push(paths.auth.login);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
    router.replace('/');
  };

  const handleItemChecked = (itemNumber: number) => {
    if (itemNumber === 1) {
      setItem1Checked(!item1Checked);
    } else if (itemNumber === 2) {
      setItem2Checked(!item2Checked);
    } else if (itemNumber === 3) {
      setItem3Checked(!item3Checked);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h3">Terms And Privacy</Typography>

      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
        Please read and accept our terms and privacy policy
      </Typography>

      <Scrollbar
        sx={{
          height: 550,
          border: '1px solid lightgray',
          borderRadius: 1,
        }}
        onScroll={handleScroll}
      >
        <Typography variant="body1" textAlign="justify" sx={{ px: 1.5 }} whiteSpace="pre-line">
          {TextDoc}
        </Typography>
      </Scrollbar>
      <Stack>
        <Stack direction="row" alignItems="center" onClick={() => handleItemChecked(1)}>
          <Checkbox checked={item1Checked} readOnly />
          <Typography variant="subtitle2" style={{ cursor: 'pointer' }}>
            I am not a Federal Government employee
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" onClick={() => handleItemChecked(2)}>
          <Checkbox checked={item2Checked} readOnly />
          <Typography variant="subtitle2" style={{ cursor: 'pointer' }}>
            I agree to not post any classified information on our Site.
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" onClick={() => handleItemChecked(3)}>
          <Checkbox checked={item3Checked} readOnly />
          <Typography variant="subtitle2" style={{ cursor: 'pointer' }}>
            I assume full responsibility for the information offered and the accuracy and content of
            the information.
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={handleLogout} size="large" color="error" variant="outlined">
          Reject
        </Button>
        <Box>
          <Button
            onClick={() => {
              setItem1Checked(true);
              setItem2Checked(true);
              setItem3Checked(true);
            }}
            size="large"
            color="info"
            sx={{ mr: 2 }}
            variant="text"
          >
            Check All
          </Button>
          <LoadingButton
            disabled={!hasScrolledToEnd || !item1Checked || !item2Checked || !item3Checked}
            loading={loading}
            onClick={acceptPrivacyPolicy}
            size="large"
            color="primary"
            variant="contained"
          >
            Accept
          </LoadingButton>
        </Box>
      </Stack>
    </Stack>
  );
}
