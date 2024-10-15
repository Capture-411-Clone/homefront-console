import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Alert, Divider, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
// hooks
import { useAuthContext } from 'src/auth/hooks';
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useUpdateProfileMutation } from 'src/_req-hooks/opportunity/user/useUpdateProfileMutation';
import { setErrors } from 'src/utils/errors';
import { UpdateProfileRequestBodyType } from 'src/@types/opportunity/user/updateProfileData';
import { GENDERS } from 'src/assets/data';

// ----------------------------------------------------------------------

type UpdateProfileRequestBodySchema = {
  [K in keyof UpdateProfileRequestBodyType]: Yup.AnySchema;
};

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user, initialize } = useAuthContext();

  const UpdateUserSchema = Yup.object().shape<UpdateProfileRequestBodySchema>({
    name: Yup.string().required('Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    username: Yup.string().required('Username is required'),
    phone: Yup.string(),
    date_of_birth: Yup.string().label('Birth day'),
    address: Yup.string(),
    company_name: Yup.string(),
    country: Yup.string(),
    gender: Yup.string(),
    id_code: Yup.string(),
    state: Yup.string(),
    title: Yup.string(),
    town_city: Yup.string(),
    zip_code: Yup.string(),
  });

  const defaultValues = {
    name: user?.name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '',
    date_of_birth: user?.date_of_birth ? new Date(user.date_of_birth).toISOString() : '',
    username: user?.username || '',
    address: user?.address || '',
    company_name: user?.company_name || '',
    country: user?.country || '',
    gender: user?.gender || '',
    id_code: user?.id_code || '',
    state: user?.state || '',
    title: user?.title || '',
    town_city: user?.town_city || '',
    zip_code: user?.zip_code || '',
  };

  const methods = useForm<UpdateProfileRequestBodyType>({
    resolver: yupResolver(UpdateUserSchema) as any,
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const { mutateAsync: updateProfile } = useUpdateProfileMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateProfile(data);
      enqueueSnackbar('Update success!');
      initialize();
    } catch (error) {
      setError('root', {
        message: error.message || 'Update profile failed please try again',
      });
      setErrors(error.data, setError);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {errors.root && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.root?.message}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
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
              <RHFTextField name="last_name" label="Last Name" />
              <RHFTextField name="phone" label="Phone Number" />
              <Controller
                name="date_of_birth"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    // TODO: uncomment this when the minDate is fixed (backend needed!)
                    // minDate={new Date('1920-01-01').toString()}
                    // maxDate={new Date().toISOString()}
                    label="Date of Birth"
                    value={field.value ? new Date(field.value) : null}
                    onChange={(newValue) => {
                      field.onChange(newValue ? newValue.toISOString() : '');
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />
              <RHFTextField name="username" label="Username" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="company_name" label="Company Name" />
              <RHFTextField name="country" label="Country" />
              <RHFSelect name="gender" label="Gender" InputLabelProps={{ shrink: true }}>
                <MenuItem value="" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                  None
                </MenuItem>

                <Divider sx={{ borderStyle: 'dashed' }} />

                {GENDERS.map((gender) => (
                  <MenuItem key={gender.value} value={gender.value}>
                    {gender.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFTextField name="id_code" label="ID Code" />
              <RHFTextField name="state" label="State" />
              <RHFTextField name="title" label="Title" />
              <RHFTextField name="town_city" label="Town City" />
              <RHFTextField name="zip_code" label="Zip Code" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                color="primary"
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
