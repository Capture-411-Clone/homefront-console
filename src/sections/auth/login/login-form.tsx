import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, IconButton, InputAdornment, Link, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import NextLink from 'next/link';
import * as Yup from 'yup';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { setErrors } from 'src/utils/errors';
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { useAuthContext } from 'src/auth/hooks';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';

export default function LoginForm() {
  const { login } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email or Username is required'),
    password: Yup.string().required('Password is required'),
    remember: Yup.boolean(),
  });
  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitSuccessful },
    setError,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data.email, data.password, data.remember || false);
      router.push(PATH_AFTER_LOGIN);
    } catch (error) {
      console.log(error);
      setError('root', {
        message: error.message || 'Login failed please try again',
      });
      setErrors(error.data, setError);
    }
  });

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        {errors.root && (
          <Alert sx={{ mb: 3 }} severity="error">
            {errors.root?.message}
          </Alert>
        )}
        <RHFTextField
          autoComplete="capture411-username"
          name="email"
          label="Email address or Username"
          fullWidth
        />
        <RHFTextField
          autoComplete="capture411-password"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        sx={{ my: 2, flexDirection: { xs: 'column', md: 'row' } }}
      >
        <RHFCheckbox name="remember" label="Remember me" />
        <Link
          component={NextLink}
          href={paths.auth.resetPassword}
          variant="body2"
          color="primary.main"
          underline="always"
        >
          Forgot password?
        </Link>
      </Stack>
      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        disabled={!errors}
      >
        Sign In
      </LoadingButton>
      <Stack
        sx={{
          my: 2,
          width: '100%',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
        justifyContent="center"
        spacing={1}
      >
        <Typography>Don’t have an account?</Typography>
        <Link
          sx={{ cursor: 'pointer' }}
          component={NextLink}
          href={paths.auth.register}
          variant="body2"
          color="primary.main"
          underline="none"
        >
          <Typography>Register</Typography>
        </Link>
      </Stack>
    </FormProvider>
  );
}
