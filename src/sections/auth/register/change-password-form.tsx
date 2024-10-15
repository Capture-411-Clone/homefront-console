import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { useRouter } from 'src/routes/hooks';
import { useSelector } from 'react-redux';
import { useAuthContext } from 'src/auth/hooks';
import { setErrors } from 'src/utils/errors';
import { registerEmailSelector, sessionCodeSelector } from 'src/redux/slices/auth';
import { paths } from 'src/routes/paths';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const currentSessionCode = useSelector(sessionCodeSelector);
  const currentEmail = useSelector(registerEmailSelector);
  const { resetPassword } = useAuthContext();

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().required().label('New Password'),
    retype: Yup.string().required().label('New Password Again'),
    session_code: Yup.string().label('Otp Code'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });
  const defaultValues = {
    password: '',
    retype: '',
    email: currentEmail,
    session_code: currentSessionCode,
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await resetPassword(data.email || '', data.password || '', data.session_code || '');
      router.push(paths.dashboard.root);
    } catch (error) {
      setError('root', {
        message: error.message || 'Reset password failed please try again',
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
      <Stack spacing={3}>
        <RHFTextField
          name="password"
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          sx={{ width: { xs: 350, md: 480 } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} edge="end">
                  <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="retype"
          label="New Password Again"
          type={showPassword ? 'text' : 'password'}
          sx={{ width: { xs: 350, md: 480 } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} edge="end">
                  <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          loading={isSubmitSuccessful || isSubmitting}
          disabled={!errors}
          sx={{ mt: 3 }}
        >
          Update Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
