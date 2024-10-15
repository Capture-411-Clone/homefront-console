import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useState } from 'react';
import { Alert, Grid, IconButton, InputAdornment, Link, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Stack } from '@mui/system';
import { Icon } from '@iconify/react';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { LoadingButton } from '@mui/lab';
import NextLink from 'next/link';
import { useSelector } from 'react-redux';
import { paths } from 'src/routes/paths';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFTextField } from 'src/components/hook-form';
import { setErrors } from 'src/utils/errors';
import { useAuthContext } from 'src/auth/hooks';
import { registerEmailSelector, sessionCodeSelector } from 'src/redux/slices/auth';

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('referralCode');

  const [showPassword, setShowPassword] = useState<boolean>(true);
  const { register } = useAuthContext();
  const router = useRouter();
  const currentSessionCode = useSelector(sessionCodeSelector);
  const currentEmail = useSelector(registerEmailSelector);

  const LoginSchema = Yup.object().shape({
    name: Yup.string().required().min(2).label('name'),
    last_name: Yup.string().required().min(2).label('last name'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Your password must be at least 8 characters .'),
    session_code: Yup.string().label('Otp Code'),
  });

  const defaultValues = {
    name: '',
    last_name: '',
    password: '',
    email: currentEmail,
    session_code: currentSessionCode,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema) as any,
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log('referralCode', referralCode);

    try {
      await register(
        data.name || '',
        data.last_name || '',
        data.email || '',
        data.password || '',
        data.session_code || '',
        referralCode || ''
      );
      router.push(paths.dashboard.general.finance);
    } catch (error) {
      setError('root', {
        message: error.message || 'Register failed please try again',
      });
      setErrors(error.data, setError);
    }
  });

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {errors.root && (
        <Alert sx={{ mb: 2 }} severity="error">
          {errors.root?.message}
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <RHFTextField name="name" label="First Name" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <RHFTextField name="last_name" label="Last Name" />
        </Grid>
        <Grid item xs={12}>
          <RHFTextField name="email" label="Email Address" disabled />
        </Grid>
        <Grid item xs={12}>
          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={
              <Stack direction="row" spacing={1} alignItems="center">
                <Icon icon="ic:baseline-info" width={16} />
                <Typography variant="caption" color="text.secondary">
                  Your password must be at least 8 characters .
                </Typography>
              </Stack>
            }
          />
        </Grid>
      </Grid>
      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        disabled={!errors}
        sx={{ mt: 2 }}
      >
        Register
      </LoadingButton>
      <Stack direction="row" sx={{ my: 2, width: '100%' }} justifyContent="center" spacing={1}>
        <Typography>Already have an account?</Typography>
        <Link
          component={NextLink}
          href={paths.auth.login}
          variant="body2"
          color="primary.main"
          underline="none"
        >
          <Typography>Login</Typography>
        </Link>
      </Stack>
    </FormProvider>
  );
}
