import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'src/routes/hooks';
import React, { useEffect, useMemo, useState } from 'react';
import { Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import FormProvider from 'src/components/hook-form/form-provider';
import NewFormCard from 'src/components/new-form-card';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { paths } from 'src/routes/paths';
import { setErrors } from 'src/utils/errors';
import { CreateAgencyRequestBodyType } from 'src/@types/opportunity/agency/createAgencyData';
import { AgencyData } from 'src/@types/opportunity/agency/agencyData';
import { DepartmentData } from 'src/@types/opportunity/department/departmentData';
import { DepartmentsQueryFiltersType } from 'src/@types/opportunity/department/queryDepartmentsData';
import { useCreateAgencyMutation } from 'src/_req-hooks/opportunity/agency/useCreateAgencyMutation';
import { useUpdateAgencyMutation } from 'src/_req-hooks/opportunity/agency/useUpdateAgencyMutation';
import { useDepartmentsQuery } from 'src/_req-hooks/opportunity/depatments/useDepartmentsQuery';

interface ExtendedCreateAgencyRequestBodyType extends CreateAgencyRequestBodyType {
  parent_department?: DepartmentData | null;
}

type CreateAgencyRequestBodySchema = {
  [K in keyof ExtendedCreateAgencyRequestBodyType]: Yup.AnySchema;
};

type AgencyNewFormProps = {
  currentAgency?: AgencyData;
  dialogMode?: boolean;
  completeDialog?: VoidFunction;
};

export default function AgencyNewEditForm({
  currentAgency,
  dialogMode,
  completeDialog,
}: AgencyNewFormProps) {
  const PER_PAGE = 50;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [filters, setFilters] = useState<DepartmentsQueryFiltersType>({});
  const [perPage, setPerPage] = useState<number>(PER_PAGE);

  const [departments, setDepartments] = useState<DepartmentData[] | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const NewAgencySchema = Yup.object().shape<CreateAgencyRequestBodySchema>({
    parent_department: Yup.object<DepartmentData>().nullable().label('Department').required(),
    name: Yup.string().required().label('Name').min(2),
    department_id: Yup.number().label('Department'),
    acronym: Yup.string().label('Acronym'),
  });

  const defaultValues: any = useMemo(
    () => ({
      parent_department: currentAgency?.department || {},
      name: currentAgency?.name || '',
      acronym: currentAgency?.acronym || '',
    }),
    [currentAgency]
  );

  const methods = useForm<ExtendedCreateAgencyRequestBodyType>({
    resolver: yupResolver(NewAgencySchema) as any,
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
    if (currentAgency) {
      reset(defaultValues);
    }
  }, [currentAgency, defaultValues, reset]);

  const { refetch } = useDepartmentsQuery(
    {
      page: 1,
      filters,
      per_page: perPage,
    },
    {
      onSuccess(data) {
        setDepartments(data.data.items);
        setTotalCount(data.data.totalRows);
      },
    }
  );

  const { mutateAsync: createAgency } = useCreateAgencyMutation();
  const { mutateAsync: updateAgency } = useUpdateAgencyMutation();

  const handelFilter = (e: any) => {
    if (!e) return;
    if (e.type === 'change') {
      const newDepartmentFilters: DepartmentsQueryFiltersType = {
        name: {
          op: 'contains',
          value: e.target.value,
        },
      };
      setFilters(newDepartmentFilters);
      refetch();
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentAgency) {
        await updateAgency({
          agency: {
            name: data.name,
            department_id: data.parent_department?.ID || 0,
            acronym: data.acronym,
          },
          ID: currentAgency.ID,
        });
        enqueueSnackbar('Update successfull', {
          variant: 'success',
        });
        if (dialogMode && completeDialog) completeDialog();
      } else {
        await createAgency({
          name: data.name,
          department_id: data.parent_department?.ID || 0,
          acronym: data.acronym,
        });
        enqueueSnackbar('Create successfull', { variant: 'success' });
        if (!dialogMode) router.push(paths.dashboard.agency.root);
        if (dialogMode && completeDialog) completeDialog();
      }
    } catch (error) {
      setError('root', {
        message: error.message || 'Something went wrong',
      });
      setErrors(error.data, setError);
    }
  });

  const handleLoadMore = () => {
    setPerPage(perPage + PER_PAGE);
    refetch();
  };

  const disabled = watch('name') === '' || watch('parent_department') === null;

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <NewFormCard
        title={`${currentAgency ? 'Edit' : 'Add New'} Agency`}
        disable={disabled}
        loading={isSubmitting}
      >
        <Stack spacing={2}>
          <RHFTextField name="name" label="Name" />
          <RHFTextField name="acronym" label="Acronym" />
          <RHFAutocomplete
            fullWidth
            helperText={errors.parent_department?.message}
            multiple={false}
            name="parent_department"
            options={departments || []}
            loadMore={handleLoadMore}
            hasMore={perPage < totalCount}
            getOptionLabel={(option) =>
              typeof option === 'string'
                ? option
                : `${option.name || ''}${option.acronym ? ' - ' : ''}${option.acronym || ''}${option.market?.name ? ' - ' : ''}${option.market?.name || ''}`
            }
            label="Select Department"
            onInputChange={handelFilter}
          />
        </Stack>
      </NewFormCard>
    </FormProvider>
  );
}
