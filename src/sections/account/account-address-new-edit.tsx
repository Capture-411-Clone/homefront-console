import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Alert, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// components
import { countries } from 'src/assets/data';
import { useCreateAddressMutation } from 'src/_req-hooks/opportunity/address/useCreateAddressMutation';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFAutocomplete, RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import { setErrors } from 'src/utils/errors';
import Iconify from 'src/components/iconify';
import { CreateAddressRequestBodyType } from 'src/@types/opportunity/address/createAddressData';
import { AddressData } from 'src/@types/opportunity/address/addressData';
import { useUpdateAddressMutation } from 'src/_req-hooks/opportunity/address/useUpdateAddressMutation';

import AccountAddressesDataGrid from './account-addresses-data-grid';

type CreateAddressRequestBodySchema = {
  [K in keyof CreateAddressRequestBodyType]: Yup.AnySchema;
};

export default function AccountAddressesNewEditForm() {
  const { enqueueSnackbar } = useSnackbar();

  const [currentAddress, setCurrentAddress] = useState<AddressData | null>(null);

  const NewAddressSchema = Yup.object().shape<CreateAddressRequestBodySchema>({
    full_name: Yup.string().required('Fullname is required'),
    phone_number: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    town_city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    zip_code: Yup.string().required('Zip code is required'),
    name: Yup.string().required('Name is required'),
    default: Yup.boolean(),
  });

  const defaultValues = {
    full_name: '',
    phone_number: '',
    address: '',
    town_city: '',
    state: '',
    country: countries.find((i) => i.label === 'United States')?.label || '',
    zip_code: '',
    name: '',
    default: false,
  } satisfies CreateAddressRequestBodyType;

  const methods = useForm<CreateAddressRequestBodyType>({
    resolver: yupResolver(NewAddressSchema) as any,
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    setValue('address', currentAddress?.address || '');
    setValue('name', currentAddress?.name || '');
    setValue('full_name', currentAddress?.full_name || '');
    setValue('phone_number', currentAddress?.phone_number || '');
    setValue('town_city', currentAddress?.town_city || '');
    setValue('state', currentAddress?.state || '');
    setValue(
      'country',
      countries.find((country) => country.label === currentAddress?.country)?.label || ''
    );
    setValue('zip_code', currentAddress?.zip_code || '');
    setValue('default', currentAddress?.default || false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress]);

  const { mutateAsync: createAddress } = useCreateAddressMutation();
  const { mutateAsync: updateAddress } = useUpdateAddressMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentAddress) {
        await updateAddress({ ID: currentAddress.ID, address: data });
      } else {
        await createAddress(data);
      }
      enqueueSnackbar(currentAddress ? 'Address updated' : 'Address created', {
        variant: 'success',
      });
      reset();
    } catch (error) {
      setError('root', {
        message: error.message || 'Create Address failed please try again',
      });
      setErrors(error.data, setError);
    }
  });

  const handleSetAddress = useCallback((address: AddressData) => {
    setCurrentAddress(address);
  }, []);

  const cancleEdit = useCallback(() => {
    setCurrentAddress(null);
  }, []);

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {errors.root && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.root?.message}
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField name="name" label="Name" />
                  <RHFTextField name="full_name" label="Full Name" />

                  <RHFTextField name="phone_number" label="Phone Number" />
                </Box>
                <RHFTextField name="address" label="Address" />
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(3, 1fr)',
                  }}
                >
                  <RHFTextField name="town_city" label="Town / City" />

                  <RHFTextField name="state" label="State" />

                  <RHFTextField name="zip_code" label="Zip/Code" />
                </Box>

                <RHFAutocomplete
                  name="country"
                  label="Country"
                  options={countries
                    .filter((i) => i.label === 'United States')
                    .map((country) => country.label)}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option) => {
                    const { code, label, phone } = countries.filter(
                      (country) => country.label === option
                    )[0];

                    if (!label) {
                      return null;
                    }

                    return (
                      <li {...props} key={label}>
                        <Iconify
                          key={label}
                          icon={`circle-flags:${code.toLowerCase()}`}
                          width={28}
                          sx={{ mr: 1 }}
                        />
                        {label} ({code}) +{phone}
                      </li>
                    );
                  }}
                />

                <RHFCheckbox
                  name="default"
                  label="Use this address as default."
                  checked={defaultValues.default}
                />
              </Stack>
              <Stack spacing={3} direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button onClick={cancleEdit} variant="outlined">
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  color="primary"
                >
                  {currentAddress ? 'Edit' : 'Add'} Address
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
      <Card sx={{ mt: 2 }}>
        <AccountAddressesDataGrid setAddress={handleSetAddress} />
      </Card>
    </>
  );
}
