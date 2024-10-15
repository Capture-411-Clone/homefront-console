import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateDepartmentRequestBodyType } from 'src/@types/opportunity/department/createDepartmentData';
import { DepartmentData } from 'src/@types/opportunity/department/departmentData';
import { DepartmentsQueryFiltersType } from 'src/@types/opportunity/department/queryDepartmentsData';
import { MarketData } from 'src/@types/opportunity/market/marketData';
import { MarketsQueryFiltersType } from 'src/@types/opportunity/market/queryMarketsData';
import { useCreateDepartmentMutation } from 'src/_req-hooks/opportunity/depatments/useCreateDepartmentMutation';
import { useUpdateDepartmentMutation } from 'src/_req-hooks/opportunity/depatments/useUpdateDepartmentMutation';
import { useMarketsQuery } from 'src/_req-hooks/opportunity/market/useGetAllMarketsQuery';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import NewFormCard from 'src/components/new-form-card';
import { paths } from 'src/routes/paths';
import { setErrors } from 'src/utils/errors';
import * as Yup from 'yup';

interface ExtendedCreateDepartmentRequestBodyType extends CreateDepartmentRequestBodyType {
  market?: MarketData | null;
}

type CreateDepartmentRequestBodySchema = {
  [K in keyof ExtendedCreateDepartmentRequestBodyType]: Yup.AnySchema;
};

type DepartmentNewFormProps = {
  currentDepartment?: DepartmentData;
};

export default function DepartmentNewEditForm({ currentDepartment }: DepartmentNewFormProps) {
  const PER_PAGE = 50;

  const [filters, setFilters] = useState<MarketsQueryFiltersType>({});
  const [perPage, setPerPage] = useState<number>(PER_PAGE);
  const [markets, setMarkets] = useState<MarketData[] | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewDepartmentSchema = Yup.object().shape<CreateDepartmentRequestBodySchema>({
    name: Yup.string().required().label('Name').min(2),
    acronym: Yup.string().label('Acronym'),
    market_id: Yup.number(),
    market: Yup.object<MarketData>().nullable().label('market').required(),
  });

  const defaultValues: any = useMemo(
    () => ({
      market: currentDepartment?.market || {},
      name: currentDepartment?.name || '',
      acronym: currentDepartment?.acronym || '',
    }),
    [currentDepartment]
  );

  const methods = useForm<ExtendedCreateDepartmentRequestBodyType>({
    resolver: yupResolver(NewDepartmentSchema) as any,
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
    if (currentDepartment) {
      reset(defaultValues);
    }
  }, [currentDepartment, defaultValues, reset]);

  const { refetch } = useMarketsQuery(
    {
      page: 1,
      filters,
      per_page: perPage,
    },
    {
      onSuccess(data) {
        setMarkets(data.data.items);
        setTotalCount(data.data.totalRows);
      },
    }
  );

  const handelFilter = (e: any) => {
    if (!e) return;
    if (e.type === 'change') {
      const newCategoryFilters: DepartmentsQueryFiltersType = {
        name: {
          op: 'contains',
          value: e.target.value,
        },
      };
      setFilters(newCategoryFilters);
      refetch();
    }
  };
  const { mutateAsync: createDepartment } = useCreateDepartmentMutation();
  const { mutateAsync: updateDepartment } = useUpdateDepartmentMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentDepartment) {
        await updateDepartment({
          department: {
            name: data.name,
            acronym: data.acronym,
            market_id: data.market?.ID || 0,
          },
          ID: currentDepartment.ID,
        });
        enqueueSnackbar('Update success!', {
          variant: 'success',
        });
      } else {
        await createDepartment({
          name: data.name,
          acronym: data.acronym,
          market_id: data.market?.ID || 0,
        });
        enqueueSnackbar('Create success', { variant: 'success' });
        router.push(paths.dashboard.department.root);
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

  const disabled = watch('name') === '';

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <NewFormCard
        title={`${currentDepartment ? 'Edit' : 'Add New'} Department`}
        disable={disabled}
        loading={isSubmitting}
      >
        <Stack spacing={2}>
          <RHFTextField name="name" label="Name" />
          <RHFTextField name="acronym" label="Acronym" />
          <RHFAutocomplete
            fullWidth
            multiple={false}
            name="market"
            options={markets || []}
            loadMore={handleLoadMore}
            hasMore={perPage < totalCount}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.name || '')}
            label="Select Market"
            onInputChange={handelFilter}
          />
        </Stack>
      </NewFormCard>
    </FormProvider>
  );
}
