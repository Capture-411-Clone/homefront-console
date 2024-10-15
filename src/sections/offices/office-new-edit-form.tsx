import * as Yup from 'yup';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import { Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OfficeData } from 'src/@types/opportunity/office/officeData';
import { CreateOfficeRequestBodyType } from 'src/@types/opportunity/office/createOfficeData';
import { OfficesQueryFiltersType } from 'src/@types/opportunity/office/queryOfficesData';
import { useOfficesQuery } from 'src/_req-hooks/opportunity/office/useGetAllofficesQuery';
import { setErrors } from 'src/utils/errors';
import FormProvider from 'src/components/hook-form/form-provider';
import NewFormCard from 'src/components/new-form-card';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { useCreateOfficeMutation } from 'src/_req-hooks/opportunity/office/useCreateOfficeMutation';
import { useUpdateOfficeMutation } from 'src/_req-hooks/opportunity/office/useUpdateOfficeMutation';
import { paths } from 'src/routes/paths';
import { useAgenciesQuery } from 'src/_req-hooks/opportunity/agency/useAgenciesQuery';
import { AgenciesQueryFiltersType } from 'src/@types/opportunity/agency/queryAgenciesData';
import { AgencyData } from 'src/@types/opportunity/agency/agencyData';

interface ExtendedCreateOfficeRequestBodyType extends CreateOfficeRequestBodyType {
  parent_Office?: OfficeData | null;
  agency_Office?: OfficeData | null;
}

type CreateOfficeRequestBodySchema = {
  [K in keyof ExtendedCreateOfficeRequestBodyType]: Yup.AnySchema;
};

type OfficeNewFormProps = {
  currentOffice?: OfficeData;
  dialogMode?: boolean;
  completeDialog?: VoidFunction;
};

export default function OfficeNewEditForm({
  currentOffice,
  dialogMode,
  completeDialog,
}: OfficeNewFormProps) {
  const PER_PAGE = 50;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [filters, setFilters] = useState<OfficesQueryFiltersType>({});
  const [perPage, setPerPage] = useState<number>(PER_PAGE);

  const [offices, setOffices] = useState<OfficeData[] | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [agencyFilters, setAgencyFilters] = useState<AgenciesQueryFiltersType>({});
  const [agencyPerPage, setAgencyPerPage] = useState<number>(PER_PAGE);

  const [Agencies, setAgencies] = useState<AgencyData[] | null>(null);
  const [agencyTotalCount, setAgencyTotalCount] = useState<number>(0);

  const NewOfficeSchema = Yup.object().shape<CreateOfficeRequestBodySchema>({
    name: Yup.string().required().label('Name').min(2),
    acronym: Yup.string().label('Acronym'),
    parent_Office: Yup.object<OfficeData>().nullable().label('Market Office'),
    agency_Office: Yup.object<OfficeData>().nullable().label('Agency Office'),
    parent_id: Yup.number().label('Market Office'),
    agency_id: Yup.number().label('Agency Office'),
  });

  const defaultValues: any = useMemo(
    () => ({
      name: currentOffice?.name || '',
      acronym: currentOffice?.acronym || '',
      parent_Office: currentOffice?.parent || {},
      agency_Office: currentOffice?.agency || {},
    }),
    [currentOffice]
  );

  const methods = useForm<ExtendedCreateOfficeRequestBodyType>({
    resolver: yupResolver(NewOfficeSchema) as any,
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
    if (currentOffice) {
      reset(defaultValues);
    }
  }, [currentOffice, defaultValues, reset]);

  const { refetch } = useOfficesQuery(
    {
      page: 1,
      filters,
      per_page: perPage,
    },
    {
      onSuccess(data) {
        setOffices(data.data.items);
        setTotalCount(data.data.totalRows);
      },
    }
  );

  const { refetch: agencyRefetch } = useAgenciesQuery(
    {
      page: 1,
      filters: agencyFilters,
      per_page: agencyPerPage,
    },
    {
      onSuccess(data) {
        setAgencies(data.data.items);
        setAgencyTotalCount(data.data.totalRows);
      },
    }
  );

  const { mutateAsync: createOffice } = useCreateOfficeMutation();
  const { mutateAsync: updateOffice } = useUpdateOfficeMutation();

  const handelFilter = (e: any) => {
    if (!e) return;
    if (e?.type === 'change') {
      const newOfficeFilters: OfficesQueryFiltersType = {
        name: {
          op: 'contains',
          value: e.target.value,
        },
      };
      setFilters(newOfficeFilters);
      refetch();
    }
  };

  const handelAgencyFilter = (e: any) => {
    if (e?.type === 'change') {
      const newAgencyFilters: AgenciesQueryFiltersType = {
        name: {
          op: 'contains',
          value: e.target.value,
        },
      };
      setAgencyFilters(newAgencyFilters);
      refetch();
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentOffice) {
        await updateOffice({
          office: {
            name: data.name,
            acronym: data.acronym,
            parent_id: data.parent_Office?.ID || 0,
            agency_id: data.agency_Office?.ID || 0,
          },
          ID: currentOffice.ID,
        });
        enqueueSnackbar('Update success!', {
          variant: 'success',
        });
        if (dialogMode && completeDialog) completeDialog();
      } else {
        await createOffice({
          name: data.name,
          acronym: data.acronym,
          parent_id: data.parent_Office?.ID || 0,
          agency_id: data.agency_Office?.ID || 0,
        });
        enqueueSnackbar('Create success', { variant: 'success' });
        if (!dialogMode) router.push(paths.dashboard.offices.root);
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

  const handleAgencyLoadMore = () => {
    setAgencyPerPage(agencyPerPage + PER_PAGE);
    agencyRefetch();
  };

  const disabled = watch('name') === '';

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <NewFormCard
        title={`${currentOffice ? 'Edit' : 'Add New'} Office`}
        disable={disabled}
        loading={isSubmitting}
      >
        <Stack spacing={2}>
          <RHFTextField name="name" label="Name" />
          <RHFTextField name="acronym" label="Acronym" />
          <RHFAutocomplete
            fullWidth
            sx={{ display: 'none' }}
            multiple={false}
            name="parent_Office"
            options={offices || []}
            loadMore={handleLoadMore}
            hasMore={perPage < totalCount}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.name || '')}
            label="Select Office Parent"
            onInputChange={handelFilter}
          />
          <RHFAutocomplete
            fullWidth
            multiple={false}
            name="agency_Office"
            options={Agencies || []}
            loadMore={handleAgencyLoadMore}
            hasMore={agencyPerPage < agencyTotalCount}
            getOptionLabel={(option) =>
              typeof option === 'string'
                ? option
                : `${option.name || ''}${option.acronym ? ' - ' : ''}${option.acronym || ''}${option.department?.acronym ? ' - ' : ''}${option.department?.acronym || ''}`
            }
            label="Select Agency"
            onInputChange={handelAgencyFilter}
          />
        </Stack>
      </NewFormCard>
    </FormProvider>
  );
}
