import { Alert } from '@mui/material';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import SendCode from 'src/_requests/opportunity/verify/sendCode';
import { useDispatch } from 'src/redux/store';
import {
  registerEmailChanged,
  registerStepChanged,
  resetPasswordStepChanged,
} from 'src/redux/slices/auth';
import { RegisterStepsEnum, ResetPasswordStepsEnum } from 'src/@types/redux/auth';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFTextField } from 'src/components/hook-form';
import { setErrors } from 'src/utils/errors';

export default function SendCodeForm() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const SendCodeFormSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(SendCodeFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // TODO: success snack
    try {
      const result = await SendCode({ email: data.email });
      console.log('verification code:', result.data.code);
      dispatch(registerEmailChanged(data.email));
      dispatch(registerStepChanged(RegisterStepsEnum.OTP));
      dispatch(resetPasswordStepChanged(ResetPasswordStepsEnum.OTP));
    } catch (error) {
      console.error(error);
      setError('root', {
        message: error.message || 'Register failed please try again',
      });
      setErrors(error.data, setError);
      enqueueSnackbar('We have problem with send Code', { variant: 'error' });
    }
  });

  // FIXME: where is resend code button? and functionality? an cooldown functionality?
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {errors.root && (
        <Alert sx={{ mb: 3 }} severity="error">
          {errors.root?.message}
        </Alert>
      )}
      <RHFTextField name="email" label="Email Address" />
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        loading={isSubmitting}
        sx={{ mt: 3 }}
      >
        Send Code
      </LoadingButton>
    </FormProvider>
  );
}
