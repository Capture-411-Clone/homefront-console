import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/system';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CreateSetAsideRequestBodyType } from 'src/@types/opportunity/set-aside/createSetAsideData';
import { SetAsideData } from 'src/@types/opportunity/set-aside/setAsideData';
import { useCreateSetAsideMutation } from 'src/_req-hooks/opportunity/set-aside/useCreateSetAsideMutation';
import { useUpdateSetAsideMutation } from 'src/_req-hooks/opportunity/set-aside/useUpdateSetAsideMutation';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import NewFormCard from 'src/components/new-form-card';
import { paths } from 'src/routes/paths';
import { setErrors } from 'src/utils/errors';
import * as Yup from 'yup';

type CreateSetAsideRequestBodySchema = {
  [K in keyof CreateSetAsideRequestBodyType]: Yup.AnySchema;
};

type SetAsideNewFormProps = {
  currentAsde?: SetAsideData;
};

export default function AsideNewEditForm({ currentAsde }: SetAsideNewFormProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewSetAsideSchema = Yup.object().shape<CreateSetAsideRequestBodySchema>({
    name: Yup.string().required().label('Name').min(2),
    acronym: Yup.string().label('Acronym'),
  });

  const defaultValues: any = useMemo(
    () => ({
      name: currentAsde?.name || '',
      acronym: currentAsde?.acronym || '',
    }),
    [currentAsde]
  );

  const methods = useForm<CreateSetAsideRequestBodyType>({
    resolver: yupResolver(NewSetAsideSchema) as any,
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
    if (currentAsde) {
      reset(defaultValues);
    }
  }, [currentAsde, defaultValues, reset]);

  const { mutateAsync: createSetAside } = useCreateSetAsideMutation();
  const { mutateAsync: updateSetAside } = useUpdateSetAsideMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentAsde) {
        await updateSetAside({
          setAside: {
            name: data.name,
            acronym: data.acronym,
          },
          ID: currentAsde.ID,
        });
        enqueueSnackbar('Update success!', {
          variant: 'success',
        });
      } else {
        await createSetAside({
          name: data.name,
          acronym: data.acronym,
        });
        enqueueSnackbar('Set Aside created successfully', { variant: 'success' });
        router.push(paths.dashboard.set_aside.root);
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
        title={`${currentAsde ? 'Edit' : 'Add New'} Set Aside`}
        disable={disabled}
        loading={isSubmitting}
      >
        <Stack spacing={2}>
          <RHFTextField name="name" label="Name" />
          <RHFTextField name="acronym" label="Acronym" />
        </Stack>
      </NewFormCard>
    </FormProvider>
  );
}
