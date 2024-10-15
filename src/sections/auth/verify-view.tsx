'use client';

import { Stack, Typography } from '@mui/material';
import React from 'react';
import Image from 'src/components/image';
import SimpleLayout from 'src/layouts/simple/layout';
import VerifyCodeForm from './register/verify-code-form';

export default function VerifyView() {
  return (
    <SimpleLayout>
      <Stack justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <Image src="/assets/illustrations/auth/ic_email_inbox.svg" />
        <Stack
          sx={{ width: { xs: 350, md: 480 } }}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h3">Please check your email!</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            {`We've emailed a 6-digit confirmation code to acb@domain, please enter
          the code in below box to verify your email.`}
          </Typography>
          <VerifyCodeForm />
        </Stack>
      </Stack>
    </SimpleLayout>
  );
}
