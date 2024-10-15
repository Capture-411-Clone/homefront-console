'use client';

import { Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Iconify from 'src/components/iconify';
import SimpleLayout from 'src/layouts/simple/layout';
import { useDispatch, useSelector } from 'src/redux/store';
import { resetPasswordStepChanged, resetPasswordStepSelector } from 'src/redux/slices/auth';
import { ResetPasswordStepsEnum } from 'src/@types/redux/auth';
import SendCodeForm from './register/send-code-form';
import VerifyCodeForm from './register/verify-code-form';
import ChangePasswordForm from './register/change-password-form';

export default function ResetPasswordView() {
  const ResetPasswordStep = useSelector(resetPasswordStepSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetPasswordStepChanged(ResetPasswordStepsEnum.Email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SimpleLayout>
      <Stack justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <Stack
          sx={{ width: { xs: 1, md: 480 } }}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Iconify width={100} icon="ic:round-lock-reset" color="primary.dark" />
          <Typography variant="h3" paragraph>
            Reset password
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            Enter you&apos;r email address and we&apos;ll send you a code
          </Typography>
          {ResetPasswordStep === ResetPasswordStepsEnum.Email && <SendCodeForm />}
          {ResetPasswordStep === ResetPasswordStepsEnum.OTP && <VerifyCodeForm isResetPassword />}
          {ResetPasswordStep === ResetPasswordStepsEnum.Password && <ChangePasswordForm />}
        </Stack>
      </Stack>
    </SimpleLayout>
  );
}
