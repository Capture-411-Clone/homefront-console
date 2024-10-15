import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Container, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import * as Yup from 'yup';
import { fNumber } from 'src/utils/format-number';
import sleep from 'src/utils/sleep';
import PricingCard from 'src/components/get-paid/pricing-card';
import { useCreatePassiveRevenueMutation } from 'src/_req-hooks/opportunity/calculators/useCreatePassiveRevenueMutation';

export default function CaptureCostForm() {
  const [level1Result, setLevel1Result] = useState(0);
  const [level2Result, setLevel2Result] = useState(0);
  const [level3Result, setLevel3Result] = useState(0);
  const [level4Result, setLevel4Result] = useState(0);
  const [level5Result, setLevel5Result] = useState(0);

  const { mutateAsync: createPassiveRevenue } = useCreatePassiveRevenueMutation();

  const PassiveRevenueFormSchema = Yup.object().shape({
    company_name: Yup.string().required('Company Name is required'),
    fullName: Yup.string().optional(),
    email: Yup.string().required().email('Email is not valid').required('Email is required'),
    level1Count: Yup.number(),
    level2Count: Yup.number(),
    level3Count: Yup.number(),
    level4Count: Yup.number(),
    level5Count: Yup.number(),
  });

  const defaultValues = {
    fullName: '',
    email: '',
    company_name: '',
    level1Count: 0,
    level2Count: 0,
    level3Count: 0,
    level4Count: 0,
    level5Count: 0,
  };

  const methods = useForm({
    resolver: yupResolver(PassiveRevenueFormSchema) as any,
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await sleep(2000);

    setLevel1Result(data.level1Count * 100);
    setLevel2Result(data.level2Count * 400);
    setLevel3Result(data.level3Count * 600);
    setLevel4Result(data.level4Count * 800);
    setLevel5Result(data.level5Count * 1000);

    // try to push data to server
    await createPassiveRevenue({
      company_name: data.company_name,
      full_name: data.fullName,
      email: data.email,
      level_one_count: data.level1Count,
      level_two_count: data.level2Count,
      level_three_count: data.level3Count,
      level_four_count: data.level4Count,
      level_five_count: data.level5Count,
    });
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h1" color="secondary.darker" textAlign="center">
        Passive{' '}
        <Typography variant="h1" component="span" color="secondary">
          Revenue{' '}
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

        <Stack
          spacing={{
            xs: 4,
            sm: 2,
          }}
        >
          <Stack
            alignItems="center"
            spacing={2}
            direction={{
              xs: 'column',
              sm: 'row',
            }}
          >
            <PricingCard
              sx={{
                flexShrink: 0,
                width: {
                  xs: 1,
                  sm: 250,
                },
              }}
              title="$1,000,000 & under"
            />
            <RHFTextField
              type="number"
              name="level1Count"
              label="Contributions Count"
              sx={{
                bgcolor: (theme) => theme.palette.background.neutral,
              }}
            />
            <PricingCard
              sx={{
                flexShrink: 1,
                width: {
                  xs: 1,
                  sm: 150,
                },
              }}
              title={`$${fNumber(level1Result)}`}
            />
          </Stack>

          <Stack
            alignItems="center"
            spacing={2}
            direction={{
              xs: 'column',
              sm: 'row',
            }}
          >
            <PricingCard
              sx={{
                flexShrink: 0,
                width: {
                  xs: 1,
                  sm: 250,
                },
              }}
              title="$1,000,001 - $25,000,000"
            />
            <RHFTextField
              type="number"
              name="level2Count"
              label="Contributions Count"
              sx={{
                bgcolor: (theme) => theme.palette.background.neutral,
              }}
            />
            <PricingCard
              sx={{
                flexShrink: 1,
                width: {
                  xs: 1,
                  sm: 150,
                },
              }}
              title={`$${fNumber(level2Result)}`}
            />
          </Stack>

          <Stack
            alignItems="center"
            spacing={2}
            direction={{
              xs: 'column',
              sm: 'row',
            }}
          >
            <PricingCard
              sx={{
                flexShrink: 0,
                width: {
                  xs: 1,
                  sm: 250,
                },
              }}
              title="$25,000,001 - $100,000,000"
            />
            <RHFTextField
              type="number"
              name="level3Count"
              label="Contributions Count"
              sx={{
                bgcolor: (theme) => theme.palette.background.neutral,
              }}
            />
            <PricingCard
              sx={{
                flexShrink: 1,
                width: {
                  xs: 1,
                  sm: 150,
                },
              }}
              title={`$${fNumber(level3Result)}`}
            />
          </Stack>

          <Stack
            alignItems="center"
            spacing={2}
            direction={{
              xs: 'column',
              sm: 'row',
            }}
          >
            <PricingCard
              sx={{
                flexShrink: 0,
                width: {
                  xs: 1,
                  sm: 250,
                },
              }}
              title="$100,000,001 - $500,000,000"
            />
            <RHFTextField
              type="number"
              name="level4Count"
              label="Contributions Count"
              sx={{
                bgcolor: (theme) => theme.palette.background.neutral,
              }}
            />
            <PricingCard
              sx={{
                flexShrink: 1,
                width: {
                  xs: 1,
                  sm: 150,
                },
              }}
              title={`$${fNumber(level4Result)}`}
            />
          </Stack>

          <Stack
            alignItems="center"
            spacing={2}
            direction={{
              xs: 'column',
              sm: 'row',
            }}
          >
            <PricingCard
              sx={{
                flexShrink: 0,
                width: {
                  xs: 1,
                  sm: 250,
                },
              }}
              title="$500,000,001 & Above"
            />
            <RHFTextField
              type="number"
              name="level5Count"
              label="Contributions Count"
              sx={{
                bgcolor: (theme) => theme.palette.background.neutral,
              }}
            />
            <PricingCard
              sx={{
                flexShrink: 1,
                width: {
                  xs: 1,
                  sm: 150,
                },
              }}
              title={`$${fNumber(level5Result)}`}
            />
          </Stack>

          <Stack
            alignItems="center"
            spacing={2}
            direction={{
              xs: 'column',
              sm: 'row',
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 1,
                  sm: 250,
                },
              }}
            />

            <Box sx={{ width: 1 }} />

            <PricingCard
              sx={{
                flexShrink: 1,
                width: {
                  xs: 1,
                  sm: 150,
                },
              }}
              title={`$${fNumber(level1Result + level2Result + level3Result + level4Result + level5Result)}`}
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
      </FormProvider>
    </Container>
  );
}
