import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Stack } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CreateFiscalYearRequestBodyType } from 'src/@types/opportunity/fiscal-year/createFiscalYearData';
import { FiscalYearData } from 'src/@types/opportunity/fiscal-year/fiscalYearData';
import { useCreateFiscalYearMutation } from 'src/_req-hooks/opportunity/fiscal-year/useCreateFiscalYearMutation';
import { useUpdateFiscalYearMutation } from 'src/_req-hooks/opportunity/fiscal-year/useUpdateFiscalYearMutation';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import NewFormCard from 'src/components/new-form-card';
import { paths } from 'src/routes/paths';
import { setErrors } from 'src/utils/errors';
import * as Yup from 'yup';

type CreateFiscalYearRequestBodySchema = {
  [K in keyof CreateFiscalYearRequestBodyType]: Yup.AnySchema;
};

type FiscalYearNewFormProps = {
  currentFiscalYear?: FiscalYearData;
};

export default function FiscalNewEditForm({ currentFiscalYear }: FiscalYearNewFormProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewFiscalYearSchema = Yup.object().shape<CreateFiscalYearRequestBodySchema>({
    year: Yup.string().required('Year is required'),
  });

  const defaultValues: any = useMemo(
    () => ({
      year: currentFiscalYear?.year || '',
    }),
    [currentFiscalYear]
  );

  const methods = useForm<CreateFiscalYearRequestBodyType>({
    resolver: yupResolver(NewFiscalYearSchema) as any,
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    if (currentFiscalYear) {
      reset(defaultValues);
    }
  }, [currentFiscalYear, defaultValues, reset]);

  const { mutateAsync: createFiscalYear } = useCreateFiscalYearMutation();
  const { mutateAsync: updateFiscalYear } = useUpdateFiscalYearMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentFiscalYear) {
        await updateFiscalYear({
          year: {
            year: data.year,
          },
          ID: currentFiscalYear.ID,
        });
        enqueueSnackbar('Update success!', {
          variant: 'success',
        });
      } else {
        await createFiscalYear({
          year: data.year,
        });
        enqueueSnackbar('Create success', { variant: 'success' });
        router.push(paths.dashboard.fiscal_year.root);
      }
    } catch (error) {
      setError('root', {
        message: error.message || 'Something went wrong',
      });
      setErrors(error.data, setError);
    }
  });

  const disabled = watch('year') === '';

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {errors.root && (
        <Alert sx={{ mb: 3 }} severity="error">
          {errors.root?.message}
        </Alert>
      )}
      <NewFormCard
        title={`${currentFiscalYear ? 'Edit' : 'Add New'} Year`}
        disable={disabled}
        loading={isSubmitting}
      >
        <Stack spacing={2}>
          <RHFTextField name="year" label="Year" helperText="Exp: 2022 - Should be four numbers" />
        </Stack>
      </NewFormCard>
    </FormProvider>
  );
}
