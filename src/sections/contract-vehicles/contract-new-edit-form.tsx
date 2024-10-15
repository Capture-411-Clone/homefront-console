import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'src/routes/hooks';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CreateVehicleRequestBodyType } from 'src/@types/opportunity/contract-vehicles/createVehicleData';
import { ContractVehiclesData } from 'src/@types/opportunity/contract-vehicles/contractVehiclesData';
import { useCreateVehicleMutation } from 'src/_req-hooks/opportunity/vehicles/useCreateVehicleMutation';
import { useUpdateVehicleMutation } from 'src/_req-hooks/opportunity/vehicles/useUpdateVehicleMutation';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import NewFormCard from 'src/components/new-form-card';
import { paths } from 'src/routes/paths';
import { setErrors } from 'src/utils/errors';
import * as Yup from 'yup';
import { Stack } from '@mui/system';

type CreateVehicleRequestBodySchema = {
  [K in keyof CreateVehicleRequestBodyType]: Yup.AnySchema;
};

type VehicleNewFormProps = {
  currentContractVehicle?: ContractVehiclesData;
  dialogMode?: boolean;
  completeDialog?: VoidFunction;
};

export default function ContractNewEditForm({
  currentContractVehicle,
  dialogMode,
  completeDialog,
}: VehicleNewFormProps) {
  const router = useRouter();

  const NewVehicleSchema = Yup.object().shape<CreateVehicleRequestBodySchema>({
    name: Yup.string().required().label('Name').min(2),
    acronym: Yup.string().label('Acronym'),
  });

  const defaultValues: any = useMemo(
    () => ({
      name: currentContractVehicle?.name || '',
      acronym: currentContractVehicle?.acronym || '',
    }),
    [currentContractVehicle]
  );

  const methods = useForm<CreateVehicleRequestBodyType>({
    resolver: yupResolver(NewVehicleSchema) as any,
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
    if (currentContractVehicle) {
      reset(defaultValues);
    }
  }, [currentContractVehicle, defaultValues, reset]);

  const { mutateAsync: createVehicle } = useCreateVehicleMutation();
  const { mutateAsync: updateVehicle } = useUpdateVehicleMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentContractVehicle) {
        await updateVehicle({
          vehicle: {
            name: data.name,
            acronym: data.acronym,
          },
          ID: currentContractVehicle.ID,
        });
        enqueueSnackbar('Update success!', {
          variant: 'success',
        });
        if (dialogMode && completeDialog) completeDialog();
      } else {
        await createVehicle({
          name: data.name,
          acronym: data.acronym,
        });
        enqueueSnackbar('Create successfull', { variant: 'success' });
        if (!dialogMode) router.push(paths.dashboard.contractVehicle.root);
        if (dialogMode && completeDialog) completeDialog();
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
        title={`${currentContractVehicle ? 'Edit' : 'New'} Contract Vehicle`}
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
