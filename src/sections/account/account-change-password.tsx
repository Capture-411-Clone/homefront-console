import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Alert } from '@mui/material';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useChangePasswordMutation } from 'src/_req-hooks/opportunity/auth/useChangePasswordMutation';
import { setErrors } from 'src/utils/errors';
import { useAuthContext } from 'src/auth/hooks';
import { useRouter, useSearchParams } from 'next/navigation';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const searchParams = useSearchParams();
  const { initialize } = useAuthContext();
  const router = useRouter();

  const returnTo = searchParams.get('returnTo') || '/';

  const showPassword = useBoolean();

  const ChangePassWordSchema = Yup.object().shape({
    password: Yup.string().required('Old Password is required'),
    new_password: Yup.string()
      .required('New Password is required')
      .min(6, 'Password must be at least 6 characters')
      .test(
        'no-match',
        'New password must be different than old password',
        (value, { parent }) => value !== parent.password
      ),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('new_password')], 'Passwords must match'),
  });

  const defaultValues = {
    password: '',
    new_password: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const { mutateAsync: changePassword } = useChangePasswordMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await changePassword({ password: data.password, new_password: data.new_password });
      await initialize();

      router.push(returnTo);
    } catch (error) {
      console.log(error);
      setError('root', {
        message: error.message || 'change password is failed please try again',
      });
      setErrors(error.data, setError);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {errors.root && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.root?.message}
        </Alert>
      )}
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField
          name="password"
          type={showPassword.value ? 'text' : 'password'}
          label="Old Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showPassword.onToggle} edge="end">
                  <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="new_password"
          label="New Password"
          type={showPassword.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showPassword.onToggle} edge="end">
                  <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={
            <Stack component="span" direction="row" alignItems="center">
              <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be minimum
              6+, one uppercase, one lowercase, one number
            </Stack>
          }
        />

        <RHFTextField
          name="confirmNewPassword"
          type={showPassword.value ? 'text' : 'password'}
          label="Confirm New Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showPassword.onToggle} edge="end">
                  <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ ml: 'auto' }}
          color="primary"
        >
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
