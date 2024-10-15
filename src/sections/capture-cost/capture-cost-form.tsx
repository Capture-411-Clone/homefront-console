import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Container, InputAdornment, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import * as Yup from 'yup';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import { fNumber } from 'src/utils/format-number';
import sleep from 'src/utils/sleep';
import { useCreateCaptureCostMutation } from 'src/_req-hooks/opportunity/calculators/useCreateCaptureCostMutation';

export default function CaptureCostForm() {
  const [annualCost, setAnnualCost] = useState(288000);
  const [capture411Cost, setCapture411Cost] = useState(72000);
  const [savings, setSavings] = useState(216000);
  const [hoursSaved, setHoursSaved] = useState(2160);

  const { mutateAsync: createCaptureCost } = useCreateCaptureCostMutation();

  const CaptureCostFormSchema = Yup.object().shape({
    company_name: Yup.string().required('Company Name is required'),
    fullName: Yup.string().optional(),
    email: Yup.string().required().email('Email is not valid').required('Email is required'),
    capture_managers_count: Yup.number().required('Capture Managers Count is required'),
    hour_rate: Yup.number().required('Hour Rate is required'),
    percentage_time: Yup.number().required('Percentage Time is required'),
  });

  const defaultValues = {
    fullName: '',
    email: '',
    company_name: '',
    capture_managers_count: 3,
    hour_rate: 100,
    percentage_time: 50,
  };

  const methods = useForm({
    resolver: yupResolver(CaptureCostFormSchema) as any,
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const _annualCost = data.capture_managers_count * 1920 * data.hour_rate * data.percentage_time;
    const _capture411Cost =
      data.capture_managers_count * 1920 * data.hour_rate * data.percentage_time * 0.25;
    const _savings =
      data.capture_managers_count * 1920 * data.hour_rate * data.percentage_time * 0.75;
    const _hoursSaved = data.capture_managers_count * 720;

    await sleep(2000);

    setAnnualCost(_annualCost);
    setCapture411Cost(_capture411Cost);
    setSavings(_savings);
    setHoursSaved(_hoursSaved);

    // Try to push data to server
    await createCaptureCost({
      company_name: data.company_name,
      email: data.email,
      full_name: data.fullName,
      hourly_rate: data.hour_rate,
      manager_count: data.capture_managers_count,
      annual_pipeline_time: data.percentage_time,
      company_annual_cost: _annualCost,
      company_capture411_cost: _capture411Cost,
      company_savings: _savings,
      company_hours_saved: _hoursSaved,
    });
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h1" color="secondary.darker" textAlign="center">
        Capture{' '}
        <Typography variant="h1" component="span" color="secondary">
          Cost{' '}
        </Typography>
        Calculator
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mt: 8, mb: 3 }}
          textAlign="center"
        >
          General Information
        </Typography>

        <Stack spacing={2}>
          <RHFTextField
            name="company_name"
            label="Company Name"
            sx={{
              bgcolor: (theme) => theme.palette.background.neutral,
            }}
          />

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
        </Stack>

        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mt: 4, mb: 3 }}
          textAlign="center"
        >
          Specific Questions
        </Typography>

        <Stack spacing={2}>
          <RHFTextField
            name="capture_managers_count"
            label="How many Capture Managers do you employ"
            sx={{
              bgcolor: (theme) => theme.palette.background.neutral,
            }}
          />

          <RHFTextField
            type="number"
            name="hour_rate"
            label="Fully Burdened Hourly Rate"
            sx={{
              bgcolor: (theme) => theme.palette.background.neutral,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body1" color="text.secondary">
                    $
                  </Typography>
                </InputAdornment>
              ),
            }}
          />

          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            <RHFTextField
              type="number"
              name="percentage_time"
              label="Percentage of time researching and building an annual pipeline"
              sx={{
                bgcolor: (theme) => theme.palette.background.neutral,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="body1" color="text.secondary">
                      %
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>

        <Box textAlign="center">
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            sx={{ my: 4, width: 150 }}
          >
            Calculate
          </LoadingButton>
        </Box>

        <Stack direction="row" justifyContent="space-between">
          <Stack spacing={2} pt={3}>
            <Stack direction="row" spacing={1}>
              <Iconify icon="clarity:clock-solid" />
              <Typography
                color={isSubmitting ? 'text.disabled' : 'text.primary'}
                variant="subtitle2"
                fontSize={18}
              >
                Annual Cost of company pipeline:{' '}
                <Typography
                  variant="subtitle2"
                  fontSize={18}
                  component="span"
                  color={isSubmitting ? 'text.disabled' : 'secondary'}
                >
                  {fNumber(annualCost)}
                </Typography>
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Iconify icon="clarity:clock-solid" />
              <Typography
                color={isSubmitting ? 'text.disabled' : 'text.primary'}
                variant="subtitle2"
                fontSize={18}
              >
                Your cost with Capture 411:{' '}
                <Typography
                  variant="subtitle2"
                  fontSize={18}
                  component="span"
                  color={isSubmitting ? 'text.disabled' : 'info.main'}
                >
                  ${fNumber(capture411Cost)}
                </Typography>
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Iconify icon="clarity:clock-solid" />
              <Typography
                color={isSubmitting ? 'text.disabled' : 'text.primary'}
                variant="subtitle2"
                fontSize={18}
              >
                Your savings with Capture 411:{' '}
                <Typography
                  variant="subtitle2"
                  fontSize={18}
                  component="span"
                  color={isSubmitting ? 'text.disabled' : 'primary'}
                >
                  ${fNumber(savings)}
                </Typography>
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Iconify icon="clarity:clock-solid" />
              <Typography
                color={isSubmitting ? 'text.disabled' : 'text.primary'}
                variant="subtitle2"
                fontSize={18}
              >
                Hours saved with Capture 411:{' '}
                <Typography
                  variant="subtitle2"
                  fontSize={18}
                  component="span"
                  color={isSubmitting ? 'text.disabled' : 'primary'}
                >
                  {fNumber(hoursSaved)} Hrs
                </Typography>
              </Typography>
            </Stack>
          </Stack>

          <Image
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'block',
              },
            }}
            src="/assets/images/calculator/iphone.png"
            width={200}
          />
        </Stack>

        <Typography sx={{ mt: 1 }} variant="subtitle1" color="text.secondary">
          Based on 1920 Hours/work year. Saving is calculated on 75% efficiency.
        </Typography>
      </FormProvider>
    </Container>
  );
}
