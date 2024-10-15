'use client';

import { Stack, Typography } from '@mui/material';
import React from 'react';
import Iconify from 'src/components/iconify';
import LoginForm from './login/login-form';

export default function LoginView() {
  return (
    <Stack sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
      <Stack spacing={2} sx={{ alignItems: 'center', mb: 5 }}>
        <Iconify icon="material-symbols:login-rounded" width={100} color="primary.dark" />
        <Typography variant="h3">Sign in</Typography>
      </Stack>
      <Stack sx={{ width: '100%', px: { xs: 5, md: 15 } }}>
        <LoginForm />
      </Stack>
    </Stack>
  );
}
