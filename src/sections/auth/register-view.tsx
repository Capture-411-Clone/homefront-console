'use client';

import { Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import { registerStepChanged, registerStepSelector } from 'src/redux/slices/auth';
import { RegisterStepsEnum } from 'src/@types/redux/auth';
import RegisterForm from './register/register-form';
import VerifyCodeForm from './register/verify-code-form';
import SendCodeForm from './register/send-code-form';

export default function RegisterView() {
  const registerStep = useSelector(registerStepSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(registerStepChanged(RegisterStepsEnum.Email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
      <Stack spacing={2} sx={{ alignItems: 'center', mb: 5 }}>
        <Typography variant="h3">Sign Up</Typography>
      </Stack>
      <Stack sx={{ width: '100%', px: { xs: 5, md: 15 } }}>
        {registerStep === RegisterStepsEnum.Email && <SendCodeForm />}
        {registerStep === RegisterStepsEnum.OTP && <VerifyCodeForm />}
        {registerStep === RegisterStepsEnum.Data && <RegisterForm />}
      </Stack>
    </Stack>
  );
}
