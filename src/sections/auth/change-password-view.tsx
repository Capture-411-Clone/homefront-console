'use client';

import { Stack, Typography } from '@mui/material';
import React from 'react';
import Iconify from 'src/components/iconify';
import SimpleLayout from 'src/layouts/simple/layout';
import AccountChangePassword from '../account/account-change-password';

export default function ChangePasswordView() {
  return (
    <SimpleLayout>
      <Stack justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <Stack sx={{ width: 480 }} justifyContent="center" alignItems="center" spacing={1}>
          <Iconify width={100} icon="ic:round-lock-reset" color="primary.dark" />
          <Typography variant="h3" paragraph>
            Change Password
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
            Please Enter a new password for your account
          </Typography>
          <AccountChangePassword />
        </Stack>
      </Stack>
    </SimpleLayout>
  );
}
