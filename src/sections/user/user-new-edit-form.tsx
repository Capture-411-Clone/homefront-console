import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/system';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RHFAutocomplete, RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import NewFormCard from 'src/components/new-form-card';
import { paths } from 'src/routes/paths';
import { setErrors } from 'src/utils/errors';
import * as Yup from 'yup';
import { UserData } from 'src/@types/opportunity/user/userData';
import { useUpdateUserMutation } from 'src/_req-hooks/opportunity/user/useUpdateUserMutation';
import { CreateUserRequestBodyType } from 'src/@types/opportunity/user/createUser';
import { useCreateUserMutation } from 'src/_req-hooks/opportunity/user/useCreateUserMutation';
import { Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Iconify from 'src/components/iconify';
import { useRolesQuery } from 'src/_req-hooks/opportunity/role/useRoleQuery';
import { RoleData } from 'src/@types/opportunity/role/roleData';
import { UsersQueryFiltersType } from 'src/@types/opportunity/user/queryUsersData';
import { useUsersQuery } from 'src/_req-hooks/opportunity/user/useUsersQuery';
import { Icon } from '@iconify/react';

export type UserStateType = {
  data: UserData[] | null;
  totalCount: number;
  perPage: number;
  filters: UsersQueryFiltersType;
};

interface ExtendedCreateUserRequestBodyType extends Omit<CreateUserRequestBodyType, 'roles'> {
  roles: RoleData[];
  contributor: UserData | null;
}

type CreatesUserRequestBodySchema = {
  [K in keyof ExtendedCreateUserRequestBodyType]: Yup.AnySchema;
};

type userNewFormProps = {
  currentUser?: UserData;
};

const PER_PAGE = 2000;

export default function UserNewEditForm({ currentUser }: userNewFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape<CreatesUserRequestBodySchema>({
    name: Yup.string().required().label('Name').min(2),
    last_name: Yup.string().required().label('Last Name'),
    date_of_birth: Yup.string().label('Date of Birth'),
    email: Yup.string().email().required().label('Email'),
    gender: Yup.string().label('Gender'),
    id_code: Yup.string().label('ID Code'),
    // TODO: MAKE IT BETTER IN FUTURE.
    password: currentUser
      ? Yup.string().label('Password')
      : Yup.string().label('Password').required('Password is required'),
    phone: Yup.string().label('Phone'),
    email_verified_at: Yup.boolean().label('Email Verified'),
    phone_verified_at: Yup.boolean().label('Phone Verified'),
    roles: Yup.array<RoleData>().label('Roles'),
    referral_code: Yup.string().label('Referral Code'),
    suspended_at: Yup.boolean().label('Suspended'),
    username: Yup.string().label('Username'),
    contributor_id: Yup.mixed().label('Contributor'),
    contributor: Yup.object<UserData>().label('Contributor').nullable(),
    should_change_password: Yup.boolean().label('Should Change Password'),
    address: Yup.string(),
    company_name: Yup.string(),
    country: Yup.string(),
    state: Yup.string(),
    title: Yup.string(),
    town_city: Yup.string(),
    zip_code: Yup.string(),
  });

  const defaultValues: any = useMemo(
    () => ({
      name: currentUser?.name || '',
      last_name: currentUser?.last_name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      date_of_birth: currentUser?.date_of_birth
        ? new Date(currentUser.date_of_birth).toISOString()
        : '',
      username: currentUser?.username || '',
      referral_code: currentUser?.referral_code || '',
      email_verified_at: !!currentUser?.email_verified_at,
      phone_verified_at: !!currentUser?.phone_verified_at,
      suspended_at: !!currentUser?.suspended_at,
      roles: currentUser?.roles || [],
      contributor_id: currentUser?.contributor_id || '',
      contributor: currentUser?.contributor || null,
      should_change_password: currentUser?.should_change_password || false,
      password: '',
      address: currentUser?.address || '',
      company_name: currentUser?.company_name || '',
      country: currentUser?.country || '',
      gender: currentUser?.gender || '',
      id_code: currentUser?.id_code || '',
      state: currentUser?.state || '',
      title: currentUser?.title || '',
      town_city: currentUser?.town_city || '',
      zip_code: currentUser?.zip_code || '',
    }),
    [currentUser]
  );

  const methods = useForm<ExtendedCreateUserRequestBodyType>({
    resolver: yupResolver(NewUserSchema) as any,
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentUser) {
      reset(defaultValues);
    }
  }, [currentUser, defaultValues, reset]);

  const { mutateAsync: createUser } = useCreateUserMutation();
  const { mutateAsync: updateUser } = useUpdateUserMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentUser) {
        await updateUser({
          user: {
            name: data.name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            date_of_birth: data.date_of_birth,
            gender: data.gender,
            id_code: data.id_code,
            phone: data.phone,
            roles: data.roles.map((role) => Number(role.ID)),
            suspended_at: data.suspended_at,
            username: data.username,
            referral_code: data.referral_code,
            email_verified_at: data.email_verified_at,
            phone_verified_at: data.phone_verified_at,
            contributor_id: Number(data.contributor?.ID) || 0,
            should_change_password: data.should_change_password,
            address: data.address,
            company_name: data.company_name,
            country: data.country,
            state: data.state,
            title: data.title,
            town_city: data.town_city,
            zip_code: data.zip_code,
          },
          ID: currentUser.ID,
        });
        enqueueSnackbar('Update success!', {
          variant: 'success',
        });
      } else {
        await createUser({
          name: data.name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
          date_of_birth: data.date_of_birth,
          gender: data.gender,
          id_code: data.id_code,
          phone: data.phone,
          roles: data.roles.map((role) => Number(role.ID)),
          suspended_at: data.suspended_at,
          username: data.username,
          referral_code: data.referral_code,
          email_verified_at: data.email_verified_at,
          phone_verified_at: data.phone_verified_at,
          contributor_id: Number(data.contributor?.ID),
          should_change_password: data.should_change_password,
          address: data.address,
          company_name: data.company_name,
          country: data.country,
          state: data.state,
          title: data.title,
          town_city: data.town_city,
          zip_code: data.zip_code,
        });
        enqueueSnackbar('User created successfully', { variant: 'success' });
        router.push(paths.dashboard.user.root);
      }
    } catch (error) {
      setError('root', {
        message: error.message || 'Something went wrong',
      });
      setErrors(error.data, setError);
    }
  });

  const { data: rolesData, isLoading: isRolesLoading } = useRolesQuery();
  const roles = rolesData?.data || [];

  const [users, setUsers] = useState<UserStateType>({
    data: null,
    totalCount: 0,
    perPage: PER_PAGE,
    filters: {},
  });

  const { refetch: refetchUsers, isLoading: userLoading } = useUsersQuery(
    {
      page: 1,
      filters: users.filters,
      per_page: users.perPage,
    },
    {
      onSuccess(data) {
        setUsers({
          ...users,
          data: data.data.items.filter((user) => user.ID !== currentUser?.ID),
          totalCount: data.data.totalRows,
        });
      },
    }
  );

  const handleLoadMoreUsers = () => {
    setUsers({ ...users, perPage: users.perPage + PER_PAGE });
    refetchUsers();
  };

  const suspended = watch('suspended_at');
  const email_verified = watch('email_verified_at');
  // const phone_verified = watch('phone_verified_at');
  const should_change_password = watch('should_change_password');

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const username = watch('username');

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <NewFormCard title={`${currentUser ? 'Edit' : 'Add New'} User`} loading={isSubmitting}>
        <Stack spacing={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="name" label="Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="last_name" label="Last Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="email" label="Email" disabled={!!currentUser?.email} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="phone" label="Phone" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="date_of_birth"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    // TODO: REFACTOR THESE LATER
                    // minDate={new Date('1920-01-01').toISOString()}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="username"
                label="Username"
                helperText={
                  errors.username?.message || username.includes(' ') ? 'No spaces allowed' : ''
                }
                error={!!errors.username || username.includes(' ')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="referral_code" label="Referral Code" />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* This and all contribute page autocompletes does not have server side search */}
              <RHFAutocomplete
                options={users.data || []}
                getOptionLabel={(option) =>
                  typeof option === 'string'
                    ? option
                    : `${option.email || ''} ${option.email ? '-' : ''} ${option.name || ''} ${option.last_name || ''}`
                }
                name="contributor"
                label="Contributor"
                loadMore={handleLoadMoreUsers}
                hasMore={users.perPage < users.totalCount}
                loading={userLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="address" label="Address" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="company_name" label="Company Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="country" label="Country" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="state" label="State" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="town_city" label="Town City" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="title" label="Title" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="zip_code" label="Zip Code" />
            </Grid>
            <Grid item xs={12} md={12}>
              <RHFTextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword} edge="end">
                        <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText={
                  <Stack component="span" direction="row" alignItems="center">
                    <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} />
                    Can be empty in update, Password must be minimum 8+, one uppercase, one
                    lowercase, one number
                  </Stack>
                }
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <RHFAutocomplete
                multiple
                fullWidth
                name="roles"
                options={roles}
                loading={isRolesLoading}
                helperText={errors.roles?.message}
                getOptionLabel={(option) =>
                  typeof option === 'string' ? option : option.title || ''
                }
                label="Roles"
              />
            </Grid>

            {watch('referral_code') && (
              <Grid item xs={12}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    color="info.main"
                    variant="body1"
                    gutterBottom
                    sx={{ pl: 2, mb: 0.2 }}
                  >
                    https://capture411.com/auth/register/?referralCode={watch('referral_code')}
                  </Typography>

                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://capture411.com/auth/register/?referralCode=${watch('referral_code')}`
                      );
                      enqueueSnackbar('Referral link copied to clipboard', {
                        variant: 'success',
                      });
                    }}
                  >
                    <Iconify icon="eva:copy-fill" sx={{ width: 28, height: 28 }} />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      window.open(
                        `https://capture411.com/auth/register/?referralCode=${watch('referral_code')}`
                      );
                    }}
                  >
                    <Iconify icon="eva:external-link-fill" sx={{ width: 28, height: 28 }} />
                  </IconButton>
                </Stack>
              </Grid>
            )}
            <Grid item xs={6} md={4}>
              <RHFCheckbox
                sx={{ ml: 1 }}
                name="suspended_at"
                label="Suspended"
                checked={suspended}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <RHFCheckbox
                sx={{ ml: 1 }}
                name="email_verified_at"
                label="Email Verified"
                checked={email_verified}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <RHFCheckbox
                sx={{ ml: 1 }}
                name="should_change_password"
                label="Should Change Password"
                checked={should_change_password}
              />
            </Grid>
            {/* <Grid item xs={6} md={4}>
              <RHFCheckbox
                sx={{ ml: 1 }}
                name="phone_verified_at"
                label="Phone Verified"
                checked={phone_verified}
              />
            </Grid> */}
          </Grid>
        </Stack>
      </NewFormCard>
    </FormProvider>
  );
}
