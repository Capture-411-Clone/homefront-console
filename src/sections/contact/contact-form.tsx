import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import SendContactUsMessageEmail from 'src/_server-actions/sendContactUsMessageEmail';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

export default function ContactForm() {
  const { enqueueSnackbar } = useSnackbar();

  const ContactFormSchema = Yup.object().shape({
    message: Yup.string().required('Message is required'),
    email: Yup.string().email('Email is not valid').required('Email is required'),
    fullName: Yup.string().optional(),
  });

  const defaultValues = {
    message: '',
    email: '',
    fullName: '',
  };

  const methods = useForm({
    resolver: yupResolver(ContactFormSchema) as any,
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await SendContactUsMessageEmail({
        subject: 'Support Message',
        fullName: data.fullName,
        email: data.email,
        message: data.message,
      });

      enqueueSnackbar('Message sent successfully. You will hear from us soon', {
        variant: 'success',
      });

      reset();
    } catch (error) {
      console.error(error);
      setError('root', {
        message: 'Something went wrong. Please try again later',
      });
    }
  });

  return (
    <Stack>
      <Typography variant="h3" color="info.darker" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        We would love to hear from you
      </Typography>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack sx={{ mt: 4.5 }} spacing={2}>
          <RHFTextField
            name="fullName"
            label="Full Name"
            sx={{
              bgcolor: (theme) => theme.palette.background.neutral,
            }}
          />

          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            <RHFTextField
              name="email"
              label="Email"
              sx={{
                bgcolor: (theme) => theme.palette.background.neutral,
              }}
            />
          </Stack>

          <RHFTextField
            name="message"
            multiline
            rows={11}
            label="Message"
            sx={{ bgcolor: (theme) => theme.palette.background.neutral }}
          />
        </Stack>
        <LoadingButton
          loading={isSubmitting}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          sx={{ my: 3 }}
        >
          Send Message
        </LoadingButton>
      </FormProvider>
    </Stack>
  );
}
