import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CategoryData } from 'src/@types/opportunity/category/categoryData';
import { CreateNaicsRequestBodyType } from 'src/@types/opportunity/naics/createNaicsData';
import { NaicsData } from 'src/@types/opportunity/naics/naicsData';
import { useCreateNaicsMutation } from 'src/_req-hooks/opportunity/naics/useCreateNaicsMutation';
import { useUpdateNaicsMutation } from 'src/_req-hooks/opportunity/naics/useUpdateNaicsMutation';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import NewFormCard from 'src/components/new-form-card';
import { paths } from 'src/routes/paths';
import { setErrors } from 'src/utils/errors';

interface ExtendedCreateNaicsRequestBodyType extends CreateNaicsRequestBodyType {
  parent_category?: CategoryData | null;
}

type CreateNaicsRequestBodySchema = {
  [K in keyof ExtendedCreateNaicsRequestBodyType]: Yup.AnySchema;
};

type NaicsNewFormProps = {
  currentNaics?: NaicsData;
};

export default function NaicsNewEditFrom({ currentNaics }: NaicsNewFormProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewNaicsSchema = Yup.object().shape<CreateNaicsRequestBodySchema>({
    parent_category: Yup.object<CategoryData>().nullable().label('Parent'),
    name: Yup.string().required().label('Name').min(2),
    category_id: Yup.number().label('Parent'),
  });

  console.log(currentNaics);
  const defaultValues: any = useMemo(
    () => ({
      name: currentNaics?.name || '',
    }),
    [currentNaics]
  );

  const methods = useForm<ExtendedCreateNaicsRequestBodyType>({
    resolver: yupResolver(NewNaicsSchema) as any,
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentNaics) {
      reset(defaultValues);
    }
  }, [currentNaics, defaultValues, reset]);

  const { mutateAsync: createNaics } = useCreateNaicsMutation();
  const { mutateAsync: updateNaics } = useUpdateNaicsMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentNaics) {
        await updateNaics({
          naics: {
            name: data.name,
            category_id: data.parent_category?.ID || 0,
          },
          ID: currentNaics.ID,
        });
        enqueueSnackbar('Update success!', {
          variant: 'success',
        });
      } else {
        await createNaics({
          name: data.name,
          category_id: data.parent_category?.ID || 0,
        });
        enqueueSnackbar('Create success', { variant: 'success' });
        router.push(paths.dashboard.Naics.root);
      }
    } catch (error) {
      setError('root', {
        message: error.message || 'Something went wrong',
      });
      setErrors(error.data, setError);
    }
  });

  const disabled = watch('name') === '';

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <NewFormCard
        title={`${currentNaics ? 'Edit' : 'Add New'} NAICS`}
        disable={disabled}
        loading={isSubmitting}
      >
        <Stack spacing={2}>
          <RHFTextField name="name" label="Name" />
        </Stack>
      </NewFormCard>
    </FormProvider>
  );
}
