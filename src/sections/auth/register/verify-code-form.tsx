import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import { useRouter } from 'src/routes/hooks';
import { RHFCode } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import useSecondCountdown from 'src/hooks/useSecondCountdown';
import { paths } from 'src/routes/paths';
import { useSnackbar } from 'src/components/snackbar';
import {
  exchangeCodeChanged,
  registerEmailSelector,
  registerStepChanged,
  resetPasswordStepChanged,
} from 'src/redux/slices/auth';
import { dispatch, useSelector } from 'src/redux/store';
import ExchangeCode from 'src/_requests/opportunity/verify/exchange';
import SendCode from 'src/_requests/opportunity/verify/sendCode';
import { setErrors } from 'src/utils/errors';
import { RegisterStepsEnum, ResetPasswordStepsEnum } from 'src/@types/redux/auth';

interface VerifyCodeFormProps {
  isResetPassword?: boolean;
}

const verifyCodeLength = 6;
export default function VerifyCodeForm(props: VerifyCodeFormProps) {
  const { isResetPassword } = props;
  const { countdown, restart } = useSecondCountdown({ init: 60 });
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const currentEmail = useSelector(registerEmailSelector);

  const VerifyCodeSchema = Yup.object().shape({
    code: Yup.string().required().min(verifyCodeLength),
  });

  const defaultValues = {
    code: '',
  };

  const methods = useForm({
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    watch,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      const result = await ExchangeCode({ code: data.code?.toString() || '' });
      dispatch(exchangeCodeChanged(result.data.session_code));
      if (isResetPassword) {
        dispatch(resetPasswordStepChanged(ResetPasswordStepsEnum.Password));
      } else {
        dispatch(registerStepChanged(RegisterStepsEnum.Data));
      }
    } catch (error) {
      setError('root', { message: error.message || "Can't verify code" });
      setErrors(error.data, setError);
      enqueueSnackbar("Can't verify code", { variant: 'error' });
    }
  };
  const resendAllowed = Boolean(countdown === 0);
  const disabled = watch('code').length !== verifyCodeLength;

  const handleComplete = () => {
    handleSubmit(onSubmit);
  };

  const resend = async () => {
    try {
      await SendCode({ email: currentEmail || '' });
      restart();
    } catch (error) {
      setError('root', { message: error.message || "Can't resend code" });
      setErrors(error.data, setError);
      enqueueSnackbar("Can't resend code", { variant: 'error' });
    }
  };

  const handleBackButton = () => {
    if (isResetPassword) {
      router.push(paths.auth.login);
    } else {
      dispatch(registerStepChanged(RegisterStepsEnum.Email));
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <Alert sx={{ mb: 2 }} severity="error">
          {errors.root?.message}
        </Alert>
      )}

      <RHFCode name="code" onComplete={handleComplete} />

      <Box px={2} display="flex" justifyContent="center">
        <Button
          disabled={!resendAllowed}
          sx={{
            color: resendAllowed ? '' : 'text.secondary',
            marginTop: 2,
            cursor: resendAllowed ? 'pointer' : 'default',
          }}
          variant="text"
          onClick={resend}
        >
          Resend Code
          {!resendAllowed && <span>&nbsp;in {countdown}&nbsp;seconde</span>}
        </Button>
      </Box>
      <LoadingButton
        disabled={disabled}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        loading={isSubmitting}
        sx={{ mt: 3 }}
      >
        Verify
      </LoadingButton>
      <Button
        fullWidth
        sx={{ mt: 1 }}
        size="large"
        startIcon={<Icon icon="iconamoon:arrow-left-2-bold" />}
        onClick={handleBackButton}
      >
        Return to {isResetPassword ? 'Login' : 'Sign up'}
      </Button>
    </FormProvider>
  );
}
