import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Divider, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import FormProvider from 'src/components/hook-form/form-provider';
import {
  AddDocumentRequestBodyType,
  CreateOpportunityRequestBodyType,
} from 'src/@types/opportunity/opportunity/createOpportunityData';
import { OpportunityData } from 'src/@types/opportunity/opportunity/opportunityData';
import { RHFAutocomplete, RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import { useCreateOpportunityMutation } from 'src/_req-hooks/opportunity/opportunity/useCreateOpportunityMutation';
import { setErrors } from 'src/utils/errors';
import { paths } from 'src/routes/paths';
import { useUpdateOpportunityMutation } from 'src/_req-hooks/opportunity/opportunity/useUpdateOpportunityMutation';
import { useMarketsQuery } from 'src/_req-hooks/opportunity/market/useGetAllMarketsQuery';
import { useDepartmentsQuery } from 'src/_req-hooks/opportunity/depatments/useDepartmentsQuery';
import { useAgenciesQuery } from 'src/_req-hooks/opportunity/agency/useAgenciesQuery';
import { EntityData, EntityItem } from 'src/sections/ai-models/view/ent-hunt-train-view';
import { useOfficesQuery } from 'src/_req-hooks/opportunity/office/useGetAllofficesQuery';
import { useNaicsQuery } from 'src/_req-hooks/opportunity/naics/useGetNaicsQuery';
import { useFiscalYearQuery } from 'src/_req-hooks/opportunity/fiscal-year/useFiscalYearQuery';
import { useSetAsideQuery } from 'src/_req-hooks/opportunity/set-aside/useGetSetAsideQuery';
import { useContractVehiclesQuery } from 'src/_req-hooks/opportunity/vehicles/useContractVehiclesQuery';
import { MarketData } from 'src/@types/opportunity/market/marketData';
import { DepartmentData } from 'src/@types/opportunity/department/departmentData';
import { AgencyData } from 'src/@types/opportunity/agency/agencyData';
import { OfficeData } from 'src/@types/opportunity/office/officeData';
import { NaicsData } from 'src/@types/opportunity/naics/naicsData';
import { FiscalYearData } from 'src/@types/opportunity/fiscal-year/fiscalYearData';
import { SetAsideData } from 'src/@types/opportunity/set-aside/setAsideData';
import { ContractVehiclesData } from 'src/@types/opportunity/contract-vehicles/contractVehiclesData';
import { MarketsQueryFiltersType } from 'src/@types/opportunity/market/queryMarketsData';
import { DepartmentsQueryFiltersType } from 'src/@types/opportunity/department/queryDepartmentsData';
import { AgenciesQueryFiltersType } from 'src/@types/opportunity/agency/queryAgenciesData';
import { OfficesQueryFiltersType } from 'src/@types/opportunity/office/queryOfficesData';
import { useAuthContext } from 'src/auth/hooks';
import { NaicsQueryFiltersType } from 'src/@types/opportunity/naics/queryNaicsData';
import { FiscalYearsQueryFiltersType } from 'src/@types/opportunity/fiscal-year/queryFiscalYearData';
import { SetAsideQueryFiltersType } from 'src/@types/opportunity/set-aside/querySetAsideData';
import { ContractVehiclesQueryFiltersType } from 'src/@types/opportunity/contract-vehicles/queyContractVehiclesData';
import {
  currentOpportunityIdChanged,
  opportunityGuessedDataReseted,
  opportunityGuessedDataSelector,
} from 'src/redux/slices/opportunity';
import { useDispatch, useSelector } from 'src/redux/store';
import { Box, Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { fNumber } from 'src/utils/format-number';
import { DocumentTypeEnum } from 'src/@types/redux/opportunity';
import CheckDuplicate from 'src/_requests/opportunity/opportunity/checkDuplicate';
import QueryEntities from 'src/_requests/opportunity/entity-hunt/queryEntities';
import { firstUpperCaseAllWords } from 'src/utils/string';
import DuplicateAlertBox from './duplicate-alert-box';
import OpportunityCreateDependencyDialog, { DependencyModels } from './create-agency-dialog';
import { useDataFetcher } from '../hooks/use-data-fetcher';

interface ExtendedCreateOpportunityRequestBodyType extends CreateOpportunityRequestBodyType {
  iDontKnow?: boolean;
}

type CreateOpportunityRequestBodySchema = {
  [K in keyof ExtendedCreateOpportunityRequestBodyType]: Yup.AnySchema;
};

type OpportunityNewEditFormProps = {
  documents: AddDocumentRequestBodyType[];
  setDocuments?: (docs: AddDocumentRequestBodyType[]) => void;
  currentOpportunity?: OpportunityData;
  refetchOpportunity?: () => void;
  requestMode?: boolean;
  AIParseDocument?: (doc: AddDocumentRequestBodyType) => Promise<void>;
  AIParseLoading?: boolean;
  isEdit?: boolean;
};

type StateType<DataType, FilterType> = {
  data: DataType[] | null;
  totalCount: number;
  perPage: number;
  filters: FilterType;
};

type MarketStateType = StateType<MarketData, MarketsQueryFiltersType>;
type DepartmentStateType = StateType<DepartmentData, DepartmentsQueryFiltersType>;
type AgencyStateType = StateType<AgencyData, AgenciesQueryFiltersType>;
type OfficeStateType = StateType<OfficeData, OfficesQueryFiltersType>;
type NaicsStateType = StateType<NaicsData, NaicsQueryFiltersType>;
type FiscalYearStateType = StateType<FiscalYearData, FiscalYearsQueryFiltersType>;
type SetAsideStateType = StateType<SetAsideData, SetAsideQueryFiltersType>;
type ContractVehiclesStateType = StateType<ContractVehiclesData, ContractVehiclesQueryFiltersType>;

type TrainDetailsType = {
  [key in keyof EntityData]: string;
};

export default function OpportunityNewEditInformation({
  documents,
  setDocuments,
  AIParseDocument,
  AIParseLoading,
  currentOpportunity,
  refetchOpportunity,
  requestMode,
  isEdit,
}: OpportunityNewEditFormProps) {
  const searchParams = useSearchParams();
  const duplicate = searchParams.get('duplicate');

  const dispatch = useDispatch();

  const [duplicatedOpportunity, setDuplicatedOpportunity] = useState<OpportunityData | null>(null);

  const { user } = useAuthContext();
  const userRoles = user?.roles;
  const isAdmin = !!userRoles?.find((role: any) => role.title === 'Admin');
  const isOwner = duplicatedOpportunity?.user_id === user?.ID;

  const isDuplicate = duplicate === 'true';
  const isDisabled = isDuplicate && !isAdmin && !isOwner;

  const [opportunityDependencyModel, setOpportunityDependencyModel] = useState<
    DependencyModels | ''
  >('');

  const [opportunityTrainedDetails, setOpportunityTrainedDetails] =
    useState<TrainDetailsType | null>(null);

  const closeOpportunityDependencyDialog = useCallback(() => {
    setOpportunityDependencyModel('');
  }, []);

  const [retryEditLoading, setRetryEditLoading] = useState<boolean>(false);
  const opportunityGuessedValues = useSelector(opportunityGuessedDataSelector);

  const NewOpportunitySchema = Yup.object().shape<CreateOpportunityRequestBodySchema>({
    title: Yup.string().required('Title is required').max(2000),
    description: Yup.string(),
    user_knows_contract_value: Yup.boolean(),
    market: Yup.string().nullable().label('Market'),
    department: Yup.string().nullable().required().label('Department'),
    agency: Yup.string().nullable().label('Agency'),
    office: Yup.string().nullable().label('Office'),
    naics: Yup.string().nullable().label('NAICS'),
    fiscal_year: Yup.string().nullable().label('Fiscal year'),
    set_aside: Yup.string().nullable().label('Set aside'),
    contract_vehicle: Yup.string().nullable().label('Contract Vehicle'),
    approved: Yup.boolean(),
    requested: Yup.boolean(),
    deprecated: Yup.boolean(),
    documents: Yup.array<AddDocumentRequestBodyType>().label('Documents'),
    is_draft: Yup.boolean(),
    solicitation_number: Yup.string()
      .when('requested', (requested, schema) =>
        requested
          ? schema
          : schema.required('Solicitation Number is required when not in request mode')
      )
      .when('is_draft', (is_draft, schema) =>
        is_draft
          ? schema
          : schema.required('Solicitation Number is required when not in draft mode')
      )
      .label('Solicitation Number'),
  });

  const defaultValues: any = useMemo(
    () => ({
      title:
        currentOpportunity?.title ||
        (!requestMode ? opportunityTrainedDetails?.TITLE || opportunityGuessedValues.title : '') ||
        '',
      description:
        currentOpportunity?.description ||
        (!requestMode ? opportunityTrainedDetails?.DESCRIPTION : '') ||
        '',
      user_contract_value: currentOpportunity?.user_contract_value || '',
      market: currentOpportunity?.market || '',
      department: currentOpportunity?.department || '',
      agency: currentOpportunity?.agency || '',
      office: currentOpportunity?.office || '',
      naics: currentOpportunity?.naics || '',
      fiscal_year: currentOpportunity?.fiscal_year || '',
      set_aside: currentOpportunity?.set_aside || '',
      contract_vehicle: currentOpportunity?.contract_vehicle || '',
      approved: !!currentOpportunity?.approved_at,
      requested: currentOpportunity?.requested || requestMode,
      documents: documents || [],
      deprecated: currentOpportunity?.deprecated || false,
      is_draft: currentOpportunity?.is_draft || false,
      solicitation_number:
        currentOpportunity?.solicitation_number ||
        (!requestMode ? opportunityGuessedValues.solicitation_number : '') ||
        '',
    }),
    [
      currentOpportunity,
      opportunityGuessedValues.solicitation_number,
      opportunityGuessedValues.title,
      requestMode,
      documents,
      opportunityTrainedDetails,
    ]
  );

  const methods = useForm<ExtendedCreateOpportunityRequestBodyType>({
    resolver: yupResolver(NewOpportunitySchema) as any,
    defaultValues,
    mode: 'all',
  });

  const {
    handleSubmit,
    setError,
    watch,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(
    () => () => {
      reset();
      setDocuments?.([]);
    },
    [reset, setDocuments]
  );

  useEffect(() => {
    setValue(
      'title',
      currentOpportunity?.title || (!requestMode ? opportunityGuessedValues.title : '') || ''
    );
    setValue(
      'solicitation_number',
      currentOpportunity?.solicitation_number ||
        (!requestMode ? opportunityGuessedValues.solicitation_number : '') ||
        ''
    );

    setValue('documents', documents || []);
    setValue('department', !isEdit ? '' : currentOpportunity?.department || '');
    setValue('market', !isEdit ? '' : currentOpportunity?.market || '');
    setValue('agency', !isEdit ? '' : currentOpportunity?.agency || '');
    setValue('office', !isEdit ? '' : currentOpportunity?.office || '');
    setValue('naics', !isEdit ? '' : currentOpportunity?.naics || '');
    setValue('fiscal_year', !isEdit ? '' : currentOpportunity?.fiscal_year || '');
    setValue('set_aside', !isEdit ? '' : currentOpportunity?.set_aside || '');
    setValue('contract_vehicle', !isEdit ? '' : currentOpportunity?.contract_vehicle || '');
    setValue('user_contract_value', currentOpportunity?.user_contract_value || '');
    setValue('requested', currentOpportunity?.requested || requestMode);
    setValue('approved', !!currentOpportunity?.approved_at);
    setValue('deprecated', currentOpportunity?.deprecated || false);
    setValue('description', currentOpportunity?.description || '');
    setValue('is_draft', currentOpportunity?.is_draft || false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isEdit,
    currentOpportunity,
    setValue,
    setDocuments,
    opportunityGuessedValues.title,
    opportunityGuessedValues.solicitation_number,
    requestMode,
  ]);

  const PER_PAGE = 50;

  const [markets, setMarkets] = useState<MarketStateType>({
    data: null,
    totalCount: 0,
    perPage: PER_PAGE,
    filters: {},
  });

  const [departments, setDepartments] = useState<DepartmentStateType>({
    data: null,
    totalCount: 0,
    perPage: PER_PAGE,
    filters: {},
  });
  const [agencies, setAgencies] = useState<AgencyStateType>({
    data: null,
    totalCount: 0,
    perPage: PER_PAGE,
    filters: {},
  });
  const [offices, setOffices] = useState<OfficeStateType>({
    data: null,
    totalCount: 0,
    perPage: PER_PAGE,
    filters: {},
  });

  const [naicses, setNaicses] = useState<NaicsStateType>({
    data: null,
    totalCount: 0,
    perPage: PER_PAGE,
    filters: {},
  });
  const [fiscalYear, setFiscalYear] = useState<FiscalYearStateType>({
    data: null,
    totalCount: 0,
    perPage: PER_PAGE,
    filters: {},
  });
  const [setAside, setSetAside] = useState<SetAsideStateType>({
    data: null,
    totalCount: 0,
    perPage: PER_PAGE,
    filters: {},
  });
  const [contractVehicles, setContractVehicles] = useState<ContractVehiclesStateType>({
    data: null,
    totalCount: 0,
    perPage: PER_PAGE,
    filters: {},
  });

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  //---------------------------------------------------------------------------------------------

  const {
    title,
    description,
    department,
    agency,
    office,
    naics,
    fiscal_year,
    set_aside,
    contract_vehicle,
    solicitation_number,
  } = watch();

  useDataFetcher<MarketData>(useMarketsQuery, markets, setMarkets);

  const { refetch: refetchDepartments, isLoading: departmentLoading } =
    useDataFetcher<DepartmentData>(useDepartmentsQuery, departments, setDepartments);

  const { refetch: refetchAgencies, isLoading: agencyLoading } = useDataFetcher<AgencyData>(
    useAgenciesQuery,
    agencies,
    setAgencies
  );

  const { refetch: refetchOffices, isLoading: officeLoading } = useDataFetcher<OfficeData>(
    useOfficesQuery,
    offices,
    setOffices
  );

  const { refetch: refetchNaics, isLoading: naicsLoading } = useDataFetcher<NaicsData>(
    useNaicsQuery,
    naicses,
    setNaicses
  );

  const { refetch: refetchFiscalYear, isLoading: fiscalYearLoading } =
    useDataFetcher<FiscalYearData>(useFiscalYearQuery, fiscalYear, setFiscalYear);

  const { refetch: refetchSetAside, isLoading: setAsideLoading } = useDataFetcher<SetAsideData>(
    useSetAsideQuery,
    setAside,
    setSetAside
  );

  const { refetch: refetchContractVehicles, isLoading: vehiclesLoading } =
    useDataFetcher<ContractVehiclesData>(
      useContractVehiclesQuery,
      contractVehicles,
      setContractVehicles
    );

  //---------------------------------------------------------------------------------------------

  const { mutateAsync: createOpportunity } = useCreateOpportunityMutation();
  const { mutateAsync: updateOpportunity } = useUpdateOpportunityMutation();

  const handelFilterDepartments = async (e: any) => {
    if (e?.type === 'change') {
      const newDepartmentFilters: DepartmentsQueryFiltersType = {
        name: {
          op: 'contains',
          value: e.target.value,
        },
      };
      setDepartments((prev) => ({ ...prev, filters: newDepartmentFilters }));
      await refetchDepartments();
    }
  };

  const handelFilterAgencies = async (e: any) => {
    if (e?.type === 'change') {
      const newAgencyFilters: AgenciesQueryFiltersType = {
        name: {
          op: 'contains',
          value: e.target.value,
        },
      };
      setAgencies((prev) => ({ ...prev, filters: newAgencyFilters }));
      await refetchAgencies();
    }
  };

  const handleFilterOffices = async (e: any) => {
    if (e?.type === 'change') {
      const newOfficeFilters = {
        name: {
          op: 'contains',
          value: e.target.value,
        },
      };
      setOffices((prev) => ({ ...prev, filters: newOfficeFilters }));
      await refetchOffices();
    }
  };

  const handelFilterNaics = async (e: any) => {
    if (e?.type === 'change') {
      const newNaicsFilters: NaicsQueryFiltersType = {
        name: {
          op: 'contains',
          value: e.target.value,
        },
      };
      setNaicses((prev) => ({ ...prev, filters: newNaicsFilters }));
      await refetchNaics();
    }
  };

  const handelFilterFiscalYear = async (e: any) => {
    if (e?.type === 'change') {
      const newFiscalYearFilters: FiscalYearsQueryFiltersType = {
        year: {
          op: 'contains',
          value: e.target.value,
        },
      };
      setFiscalYear((prev) => ({ ...prev, filters: newFiscalYearFilters }));
      await refetchFiscalYear();
    }
  };

  const handelFilterSetAside = async (e: any) => {
    if (e?.type === 'change') {
      const newSetAsideFilters: SetAsideQueryFiltersType = {
        name: {
          op: 'contains',
          value: e.target.value,
        },
      };
      setSetAside((prev) => ({ ...prev, filters: newSetAsideFilters }));
      await refetchSetAside();
    }
  };

  const handelFilterContractVehicles = async (e: any) => {
    if (e?.type === 'change') {
      const newContractVehiclesFilters: ContractVehiclesQueryFiltersType = {
        name: {
          op: 'contains',
          value: e.target.value,
        },
      };
      setContractVehicles((prev) => ({ ...prev, filters: newContractVehiclesFilters }));
      await refetchContractVehicles();
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!documents.length && !requestMode) {
        throw new Error('Please add documents');
      }

      if (currentOpportunity) {
        await updateOpportunity({
          opportunityData: {
            ...data,
            documents: documents.filter((doc) => doc.title !== ''),
            requested: data.requested,
            approved: data.approved,
            deprecated: data.deprecated,
            is_draft: data.is_draft,
          },
          ID: currentOpportunity.ID,
        });

        dispatch(currentOpportunityIdChanged(currentOpportunity.ID));

        refetchOpportunity?.();
        enqueueSnackbar('update opportunity is success', {
          variant: 'success',
        });
        router.push(paths.dashboard.opportunity.root);
      } else {
        const opp = await createOpportunity({
          ...data,
          documents: documents || [],
          requested: data.requested,
          approved: data.approved,
          deprecated: data.deprecated,
          is_draft: data.is_draft,
        });

        dispatch(currentOpportunityIdChanged(opp.data.ID));

        enqueueSnackbar('create opportunity is success', {
          variant: 'success',
        });
        if (requestMode) {
          router.push(paths.dashboard.opportunity.requestedList);
        } else {
          router.push(paths.dashboard.opportunity.root);
        }
      }
    } catch (error) {
      setError('root', {
        message: error.message || 'create opportunity is failed',
      });
      setErrors(error.data, setError);
    }
  });

  const handleLoadMoreDepartments = () => {
    setDepartments((prev) => ({ ...prev, perPage: prev.perPage + PER_PAGE }));
    refetchDepartments();
  };

  const handleLoadMoreAgencies = () => {
    setAgencies((prev) => ({ ...prev, perPage: prev.perPage + PER_PAGE }));
    refetchAgencies();
  };

  const handleLoadMoreOffices = () => {
    setOffices((prev) => ({ ...prev, perPage: prev.perPage + PER_PAGE }));
    refetchOffices();
  };

  const handleLoadMoreNAICS = () => {
    setNaicses((prev) => ({ ...prev, perPage: prev.perPage + PER_PAGE }));
    refetchNaics();
  };

  const handleLoadMoreFiscalYear = () => {
    setFiscalYear((prev) => ({ ...prev, perPage: prev.perPage + PER_PAGE }));
    refetchFiscalYear();
  };

  const handleLoadMoreSetAside = () => {
    setSetAside((prev) => ({ ...prev, perPage: prev.perPage + PER_PAGE }));
    refetchSetAside();
  };

  const handleLoadMoreVehicles = () => {
    setContractVehicles((prev) => ({ ...prev, perPage: prev.perPage + PER_PAGE }));
    refetchContractVehicles();
  };

  // const user_contract_value = watch('user_contract_value');

  // const handleIdontKnowChange = (e: any) => {
  //   if (e.target.checked) {
  //     setValue('user_contract_value', 'Unknown');
  //   }
  // };

  const getTitle = useCallback(async () => {
    if (title) return;
    if (opportunityTrainedDetails?.TITLE && !requestMode) {
      // const results = await QueryDepartments('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'equals', value: opportunityTrainedDetails?.DEPARTMENT },
      // });
      // if (results.data.items[0]) {
      // setValue('department', results.data.items[0].name);
      // }
      setValue('title', firstUpperCaseAllWords(opportunityTrainedDetails?.TITLE));
      return;
    }

    if (opportunityGuessedValues.title && !requestMode) {
      // const results = await QueryDepartments('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'equals', value: opportunityGuessedValues.department },
      // });
      // if (results.data.items[0]) {
      //   setValue('department', results.data.items[0].name);
      // }
      setValue('title', firstUpperCaseAllWords(opportunityGuessedValues.title));
    }
  }, [
    title,
    setValue,
    opportunityGuessedValues.title,
    requestMode,
    opportunityTrainedDetails?.TITLE,
  ]);

  useEffect(() => {
    if (!currentOpportunity?.title) {
      getTitle();
    }
  }, [getTitle, currentOpportunity?.title]);

  const getDescription = useCallback(async () => {
    if (description) return;
    if (opportunityTrainedDetails?.DESCRIPTION && !requestMode) {
      setValue('description', firstUpperCaseAllWords(opportunityTrainedDetails?.DESCRIPTION));
      // eslint-disable-next-line no-useless-return
      return;
    }

    if (opportunityGuessedValues.description && !requestMode) {
      setValue('title', firstUpperCaseAllWords(opportunityGuessedValues.description));
    }
  }, [
    description,
    setValue,
    opportunityGuessedValues.description,
    requestMode,
    opportunityTrainedDetails?.DESCRIPTION,
  ]);

  useEffect(() => {
    if (!currentOpportunity?.description) {
      getDescription();
    }
  }, [getDescription, currentOpportunity?.description]);

  // set department and department_id based on guessed department
  const getDepartments = useCallback(async () => {
    if (department) return;
    if (opportunityTrainedDetails?.DEPARTMENT && !requestMode) {
      // const results = await QueryDepartments('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'equals', value: opportunityTrainedDetails?.DEPARTMENT },
      // });
      // if (results.data.items[0]) {
      // setValue('department', results.data.items[0].name);
      // }
      setValue('department', firstUpperCaseAllWords(opportunityTrainedDetails?.DEPARTMENT));
      return;
    }

    if (opportunityGuessedValues.department && !requestMode) {
      // const results = await QueryDepartments('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'equals', value: opportunityGuessedValues.department },
      // });
      // if (results.data.items[0]) {
      //   setValue('department', results.data.items[0].name);
      // }
      setValue('department', firstUpperCaseAllWords(opportunityGuessedValues.department));
    }
  }, [
    department,
    setValue,
    opportunityGuessedValues.department,
    requestMode,
    opportunityTrainedDetails?.DEPARTMENT,
  ]);

  useEffect(() => {
    if (!currentOpportunity?.department) {
      getDepartments();
    }
  }, [getDepartments, currentOpportunity?.department]);

  const getAgency = useCallback(async () => {
    if (agency) return;
    if (opportunityTrainedDetails?.AGENCY && !requestMode) {
      // const results = await QueryAgencies('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'equals', value: opportunityTrainedDetails?.AGENCY },
      // });
      // if (results.data.items[0]) {
      //   setValue('agency', results.data.items[0].name);
      // }
      setValue('agency', firstUpperCaseAllWords(opportunityTrainedDetails?.AGENCY));
      return;
    }

    if (opportunityGuessedValues.agency && !requestMode) {
      // const results = await QueryAgencies('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'equals', value: opportunityGuessedValues.agency },
      // });
      // if (results.data.items[0]) {
      //   setValue('agency', results.data.items[0].name);
      // }
      setValue('agency', firstUpperCaseAllWords(opportunityGuessedValues.agency));
    }
  }, [
    agency,
    setValue,
    opportunityGuessedValues.agency,
    requestMode,
    opportunityTrainedDetails?.AGENCY,
  ]);

  useEffect(() => {
    if (!currentOpportunity?.agency) {
      getAgency();
    }
  }, [getAgency, currentOpportunity?.agency]);

  const getOffice = useCallback(async () => {
    if (office) return;
    if (opportunityTrainedDetails?.OFFICE && !requestMode) {
      // const results = await QueryOffices('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'equals', value: opportunityTrainedDetails?.OFFICE },
      // });
      // if (results.data.items[0]) {
      //   setValue('office', results.data.items[0].name);
      // }
      setValue('office', firstUpperCaseAllWords(opportunityTrainedDetails?.OFFICE));
      return;
    }

    if (opportunityGuessedValues.office && !requestMode) {
      // const results = await QueryOffices('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'equals', value: opportunityGuessedValues.office },
      // });
      // if (results.data.items[0]) {
      //   setValue('office', results.data.items[0].name);
      // }
      setValue('office', firstUpperCaseAllWords(opportunityGuessedValues.office));
    }
  }, [
    office,
    setValue,
    opportunityGuessedValues.office,
    requestMode,
    opportunityTrainedDetails?.OFFICE,
  ]);

  useEffect(() => {
    if (!currentOpportunity?.office) {
      getOffice();
    }
  }, [getOffice, currentOpportunity?.office]);

  const getNaics = useCallback(async () => {
    if (naics) return;
    if (opportunityTrainedDetails?.NAICS && !requestMode) {
      // const results = await QueryNaics('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'equals', value: opportunityTrainedDetails?.NAICS },
      // });
      // if (results.data.items[0]) {
      //   setValue('naics', results.data.items[0].name);
      // }
      setValue('naics', firstUpperCaseAllWords(opportunityTrainedDetails?.NAICS));
      return;
    }

    if (opportunityGuessedValues.naics && !requestMode) {
      // const results = await QueryNaics('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'contains', value: opportunityGuessedValues.naics },
      // });
      // if (results.data.items[0]) {
      //   setValue('naics', results.data.items[0].name);
      // }
      setValue('naics', firstUpperCaseAllWords(opportunityGuessedValues.naics));
    }
  }, [
    naics,
    setValue,
    opportunityGuessedValues.naics,
    requestMode,
    opportunityTrainedDetails?.NAICS,
  ]);

  useEffect(() => {
    if (!currentOpportunity?.naics) {
      getNaics();
    }
  }, [getNaics, currentOpportunity?.naics]);

  const getFiscalYear = useCallback(async () => {
    if (fiscal_year) return;
    if (opportunityTrainedDetails?.FISCAL_YEAR && !requestMode) {
      // const results = await QueryFiscalYear('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'equals', value: opportunityTrainedDetails?.FISCAL_YEAR },
      // });
      // if (results.data.items[0]) {
      //   setValue('fiscal_year', results.data.items[0].year);
      // }
      setValue('fiscal_year', firstUpperCaseAllWords(opportunityTrainedDetails?.FISCAL_YEAR));
      return;
    }

    if (opportunityGuessedValues.year && !requestMode) {
      // const results = await QueryFiscalYear('', 1, 50, 'desc', 'id', {
      //   year: { op: 'contains', value: opportunityGuessedValues.year },
      // });
      // if (results.data.items[0]) {
      //   setValue('fiscal_year', results.data.items[0].year);
      // }
      setValue('fiscal_year', firstUpperCaseAllWords(opportunityGuessedValues.year));
    }
  }, [
    fiscal_year,
    setValue,
    opportunityGuessedValues.year,
    requestMode,
    opportunityTrainedDetails?.FISCAL_YEAR,
  ]);

  useEffect(() => {
    if (!currentOpportunity?.fiscal_year) {
      getFiscalYear();
    }
  }, [getFiscalYear, currentOpportunity?.fiscal_year]);

  const getSetAside = useCallback(async () => {
    if (set_aside) return;
    if (opportunityTrainedDetails?.SET_ASIDE && !requestMode) {
      // const results = await QuerySetAside('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'equals', value: opportunityTrainedDetails?.SET_ASIDE },
      // });
      // if (results.data.items[0]) {
      //   setValue('set_aside', results.data.items[0].name);
      // }
      setValue('set_aside', firstUpperCaseAllWords(opportunityTrainedDetails?.SET_ASIDE));
      return;
    }

    if (opportunityGuessedValues.set_aside && !requestMode) {
      // const results = await QuerySetAside('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'equals', value: opportunityGuessedValues.set_aside },
      // });
      // if (results.data.items[0]) {
      //   setValue('set_aside', results.data.items[0].name);
      // }
      setValue('set_aside', firstUpperCaseAllWords(opportunityGuessedValues.set_aside));
    }
  }, [
    set_aside,
    setValue,
    opportunityGuessedValues.set_aside,
    requestMode,
    opportunityTrainedDetails?.SET_ASIDE,
  ]);

  useEffect(() => {
    if (!currentOpportunity?.set_aside) {
      getSetAside();
    }
  }, [getSetAside, currentOpportunity?.set_aside]);

  const getContractVehicles = useCallback(async () => {
    if (contract_vehicle) return;
    if (opportunityTrainedDetails?.CONTRACT_VEHICLE && !requestMode) {
      // const results = await QueryContractVehicles('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'equals', value: opportunityTrainedDetails?.CONTRACT_VEHICLE },
      // });
      // if (results.data.items[0]) {
      //   setValue('contract_vehicle', results.data.items[0].name);
      // }
      setValue(
        'contract_vehicle',
        firstUpperCaseAllWords(opportunityTrainedDetails?.CONTRACT_VEHICLE)
      );
      return;
    }

    if (opportunityGuessedValues.contract_vehicle && !requestMode) {
      // const results = await QueryContractVehicles('', 1, 50, 'desc', 'id', {
      //   similar_name: { op: 'equals', value: opportunityGuessedValues.contract_vehicle },
      // });
      // if (results.data.items[0]) {
      //   setValue('contract_vehicle', results.data.items[0].name);
      // }
      setValue(
        'contract_vehicle',
        firstUpperCaseAllWords(opportunityGuessedValues.contract_vehicle)
      );
    }
  }, [
    contract_vehicle,
    setValue,
    opportunityGuessedValues.contract_vehicle,
    requestMode,
    opportunityTrainedDetails,
  ]);

  useEffect(() => {
    if (!currentOpportunity?.contract_vehicle) {
      getContractVehicles();
    }
  }, [getContractVehicles, currentOpportunity?.contract_vehicle]);

  const [internalGptParseLoading, setInternalGptParseLoading] = useState(false);

  const handleRetryParseDocument = async () => {
    const rfpOrSowDocument = documents?.find(
      (doc) => doc.title === DocumentTypeEnum.RFP_RFQ || doc.title === DocumentTypeEnum.SOWs_PWS
    );
    if (rfpOrSowDocument?.file_path) {
      setInternalGptParseLoading(true);
      await AIParseDocument?.({
        file_path: rfpOrSowDocument.file_path,
        mainFile: rfpOrSowDocument.mainFile,
        title: rfpOrSowDocument.title,
      });
      setInternalGptParseLoading(false);
    }
  };

  useEffect(
    () => () => {
      reset();
      dispatch(opportunityGuessedDataReseted());
    },
    [reset, dispatch]
  );

  const handleDuplicate = useCallback(async (sol_num: string) => {
    const result = await CheckDuplicate(sol_num);
    setDuplicatedOpportunity(result.data.opportunity);
  }, []);

  useEffect(() => {
    if (solicitation_number) {
      handleDuplicate(solicitation_number);
    } else {
      setDuplicatedOpportunity(null);
    }
  }, [solicitation_number, handleDuplicate]);

  function processEntityData(entityData: EntityData): TrainDetailsType {
    const result: TrainDetailsType = {
      CONTRACT_VEHICLE: '',
      NAICS: '',
      SET_ASIDE: '',
      AGENCY: '',
      OFFICE: '',
      DEPARTMENT: '',
      FISCAL_YEAR: '',
      SOLICITATION_NUMBER: '',
      DESCRIPTION: '',
      TITLE: '',
    };

    const keys = Object.keys(entityData) as Array<keyof EntityData>;
    keys.forEach((key) => {
      result[key] =
        entityData[key].find(
          (item: EntityItem) => (item.custom && item.value) || (item.correct && item.value)
        )?.value || '';
    });

    return result;
  }

  const fetchEntities = useCallback(async () => {
    documents.forEach(async (doc) => {
      let file_name = doc.title === DocumentTypeEnum.RFP_RFQ ? doc?.mainFile?.name : '';
      file_name = doc.title === DocumentTypeEnum.SOWs_PWS ? doc?.mainFile?.name : file_name;

      if (solicitation_number || (fiscal_year && file_name)) {
        try {
          const res = await QueryEntities(
            '1',
            1,
            100,
            'asc',
            'ID',
            '1',
            file_name || '',
            fiscal_year || '',
            solicitation_number || ''
          );
          const processedDetails = processEntityData(
            res.data.items[0].details as unknown as EntityData
          );
          setOpportunityTrainedDetails(processedDetails);
        } catch (error) {
          console.log(error);
        }
      }
    });
  }, [solicitation_number, fiscal_year, documents]);

  useEffect(() => {
    fetchEntities();
  }, [fetchEntities]);

  const handleRetryEdit = async () => {
    if (!currentOpportunity) return;
    try {
      setRetryEditLoading(true);
      await updateOpportunity({
        opportunityData: {
          ...currentOpportunity,
          requested: currentOpportunity.requested,
          approved: !!currentOpportunity.approved_at,
          deprecated: currentOpportunity.deprecated,
          is_draft: currentOpportunity.is_draft || false,
        },
        ID: currentOpportunity.ID,
      });
      refetchOpportunity?.();
      enqueueSnackbar('Contract value is updated', {
        variant: 'success',
      });
      setRetryEditLoading(false);
    } catch (error) {
      enqueueSnackbar('Contract value is failed to update', {
        variant: 'error',
      });
      setRetryEditLoading(false);
    }
  };

  const approved = watch('approved');
  const requested = watch('requested');
  const deprecated = watch('deprecated');

  const hasRFPorSOW = documents?.find(
    (doc) => doc.title === DocumentTypeEnum.RFP_RFQ || doc.title === DocumentTypeEnum.SOWs_PWS
  );

  // Function to handle onBlur event for RHFAutocomplete
  const handleAutocompleteBlur = (name: any) => (event: any) => {
    const inputValue = event.target.value;
    setValue(name, inputValue);
  };

  // const handleMarket = useCallback(async () => {
  //   if (department) {
  //     const departmentData = await QueryDepartments('', 1, 50, 'desc', 'id', {
  //       similar_name: { op: 'equals', value: department },
  //     });
  //     setValue('market', departmentData?.data?.items[0]?.market?.name || '');
  //   }
  // }, [department, setValue]);

  // // Set market based on selected department
  // useEffect(() => {
  //   handleMarket();
  // }, [department, handleMarket]);

  return (
    <FormProvider disabledEnter methods={methods} onSubmit={onSubmit}>
      {errors.root && (
        <Alert sx={{ mb: 3 }} severity="error">
          {errors.root?.message}
        </Alert>
      )}

      {isAdmin && !requestMode && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" component="div">
                AI Contract Value:{' '}
                <Typography variant="subtitle1" component="span" color="secondary.main">
                  ${fNumber(currentOpportunity?.crawler_contract_value || '')}
                </Typography>
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body1" component="div">
                  Multi Award:{' '}
                  <Typography
                    variant="subtitle1"
                    component="span"
                    color={currentOpportunity?.multi_award ? 'error.main' : 'success.main'}
                  >
                    {currentOpportunity?.multi_award ? 'Yes' : 'No'}
                  </Typography>
                </Typography>
                {currentOpportunity &&
                  currentOpportunity.solicitation_number &&
                  (currentOpportunity.crawler_contract_value === '0' ||
                    currentOpportunity.crawler_contract_value === '') && (
                    <LoadingButton
                      loading={retryEditLoading}
                      variant="outlined"
                      color="secondary"
                      onClick={handleRetryEdit}
                    >
                      Retry Fetch Value
                    </LoadingButton>
                  )}
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ my: 4 }} />
        </>
      )}

      {!requestMode && hasRFPorSOW && (
        <Typography
          component="div"
          sx={{
            bgcolor: 'background.neutral',
            mb: 6,
            pl: 1,
            lineHeight: 2,
            px: 2,
            py: 1,
            borderRadius: 1,
          }}
          color="text.secondary"
          variant="body2"
        >
          <Stack direction="row" justifyContent="space-between" py={1}>
            <Typography
              color="text.primary"
              component="div"
              sx={{ lineHeight: 1.6 }}
              variant="subtitle2"
            >
              Below is data extracted from the RFP/RFQ.
              <br />
              Use this information in combination with the information auto filled to make any
              corrections within the form.
            </Typography>
            {isAdmin && (
              <LoadingButton
                loading={internalGptParseLoading || AIParseLoading}
                variant="outlined"
                color="info"
                onClick={handleRetryParseDocument}
              >
                Retry AI Process
              </LoadingButton>
            )}
          </Stack>
          <Divider sx={{ my: 1 }} />
          Department:{' '}
          <Typography component="span" variant="subtitle2">
            {opportunityGuessedValues.department || 'Not Found'}
          </Typography>
          <br />
          Agency:{' '}
          <Typography component="span" variant="subtitle2">
            {opportunityGuessedValues.agency || 'Not Found'}
          </Typography>
          <br />
          Office:{' '}
          <Typography component="span" variant="subtitle2">
            {opportunityGuessedValues.office || 'Not Found'}
          </Typography>
          <br />
          NAICS:{' '}
          <Typography component="span" variant="subtitle2">
            {opportunityGuessedValues.naics || 'Not Found'}
          </Typography>
          <br />
          Year:{' '}
          <Typography component="span" variant="subtitle2">
            {opportunityGuessedValues.year || 'Not Found'}
          </Typography>
          <br />
          Set Aside:{' '}
          <Typography component="span" variant="subtitle2">
            {opportunityGuessedValues.set_aside || 'Not Found'}
          </Typography>
          <br />
          Contract Vehicle:{' '}
          <Typography component="span" variant="subtitle2">
            {opportunityGuessedValues.contract_vehicle || 'Not Found'}
          </Typography>
          <br />
        </Typography>
      )}

      <Grid container spacing={3}>
        {Boolean(duplicatedOpportunity) && (!isOwner || !isEdit) && (
          <Grid item xs={12}>
            <DuplicateAlertBox
              owner={isOwner}
              opportunity={duplicatedOpportunity}
              noButton={isEdit}
            />
          </Grid>
        )}
        <Grid item xs={12} md={12}>
          <RHFCheckbox sx={{ ml: 0.1 }} name="is_draft" label="These are Draft Documents" />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFTextField name="title" label="Title" required disabled={isDisabled} />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFTextField
            disabled={isDisabled}
            name="solicitation_number"
            label="Solicitation Number"
          />
        </Grid>

        {!requestMode && isAdmin && (
          <Grid item xs={12} md={6}>
            <RHFTextField name="user_contract_value" label="Contract Value" disabled={isDisabled} />
          </Grid>
        )}

        {/*
         <Grid item xs={12} md={6}>
          <RHFAutocomplete
            freeSolo
            disabled={isDisabled}
            options={(markets.data || []).map((market) => market.name || '')}
            name="market"
            label="Market"
            required={requestMode}
            hasMore={markets.perPage < markets.totalCount}
            loading={marketLoading}
          />
        </Grid>
        */}

        <Grid item xs={12} md={6}>
          <RHFAutocomplete
            freeSolo
            disabled={isDisabled}
            helperText={`${
              opportunityGuessedValues.department ? 'Suggestion: ' : ''
            }${opportunityGuessedValues.department}`}
            options={(departments.data || []).map((dept) => dept.name || '')}
            name="department"
            label="Department"
            required
            loadMore={handleLoadMoreDepartments}
            hasMore={departments.perPage < departments.totalCount}
            onInputChange={handelFilterDepartments}
            loading={departmentLoading}
            onBlur={handleAutocompleteBlur('department')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFAutocomplete
            freeSolo
            disabled={isDisabled}
            helperText={`${
              opportunityGuessedValues.agency ? 'Suggestion: ' : ''
            }${opportunityGuessedValues.agency}`}
            options={(agencies.data || []).map((a) => a.name || '')}
            name="agency"
            label="Agency"
            loadMore={handleLoadMoreAgencies}
            hasMore={agencies.perPage < agencies.totalCount}
            onInputChange={handelFilterAgencies}
            loading={agencyLoading}
            onBlur={handleAutocompleteBlur('agency')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFAutocomplete
            freeSolo
            disabled={isDisabled}
            helperText={`${
              opportunityGuessedValues.office ? 'Suggestion: ' : ''
            }${opportunityGuessedValues.office}`}
            options={(offices.data || []).map((o) => o.name || '')}
            name="office"
            label="Office"
            loadMore={handleLoadMoreOffices}
            hasMore={offices.perPage < offices.totalCount}
            onInputChange={handleFilterOffices}
            loading={officeLoading}
            onBlur={handleAutocompleteBlur('office')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFAutocomplete
            freeSolo
            disabled={isDisabled}
            helperText={`${
              opportunityGuessedValues.naics ? 'Suggestion: ' : ''
            }${opportunityGuessedValues.naics}`}
            options={(naicses.data || []).map((naicsItem) => naicsItem.name || '')}
            name="naics"
            label="NAICS"
            loadMore={handleLoadMoreNAICS}
            hasMore={naicses.perPage < naicses.totalCount}
            onInputChange={handelFilterNaics}
            loading={naicsLoading}
            onBlur={handleAutocompleteBlur('naics')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFAutocomplete
            freeSolo
            disabled={isDisabled}
            helperText={`${
              opportunityGuessedValues.year ? 'Suggestion: ' : ''
            }${opportunityGuessedValues.year}`}
            options={(fiscalYear.data || []).map((fy) => fy.year || '')}
            name="fiscal_year"
            label="Year Issued"
            loadMore={handleLoadMoreFiscalYear}
            hasMore={fiscalYear.perPage < fiscalYear.totalCount}
            onInputChange={handelFilterFiscalYear}
            loading={fiscalYearLoading}
            onBlur={handleAutocompleteBlur('fiscal_year')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFAutocomplete
            freeSolo
            disabled={isDisabled}
            helperText={`${
              opportunityGuessedValues.set_aside ? 'Suggestion: ' : ''
            }${opportunityGuessedValues.set_aside}`}
            options={(setAside.data || []).map((sa) => sa.name || '')}
            name="set_aside"
            label="Set Aside"
            loadMore={handleLoadMoreSetAside}
            hasMore={setAside.perPage < setAside.totalCount}
            onInputChange={handelFilterSetAside}
            loading={setAsideLoading}
            onBlur={handleAutocompleteBlur('set_aside')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <RHFAutocomplete
            freeSolo
            disabled={isDisabled}
            helperText={`${
              opportunityGuessedValues.contract_vehicle ? 'Suggestion: ' : ''
            }${opportunityGuessedValues.contract_vehicle}`}
            options={(contractVehicles.data || []).map((cv) => cv.name || '')}
            name="contract_vehicle"
            label="Contract Vehicle"
            loadMore={handleLoadMoreVehicles}
            hasMore={contractVehicles.perPage < contractVehicles.totalCount}
            onInputChange={handelFilterContractVehicles}
            loading={vehiclesLoading}
            onBlur={handleAutocompleteBlur('contract_vehicle')}
          />
        </Grid>

        <Grid item xs={12}>
          <RHFTextField
            name="description"
            label="Description"
            multiline
            rows={4}
            disabled={isDisabled}
          />
        </Grid>

        {isAdmin && (
          <>
            <Grid item xs={12} md={4} sx={{ mb: 1 }}>
              <RHFCheckbox
                sx={{ ml: 1 }}
                name="approved"
                label="Approved For Database"
                checked={approved}
              />
            </Grid>

            <Grid item xs={12} md={4} sx={{ mb: 1 }}>
              <RHFCheckbox
                sx={{ ml: 1 }}
                name="deprecated"
                label="Mark Depreciated"
                checked={deprecated}
              />
            </Grid>

            {!requestMode && (
              <Grid item xs={12} md={4} sx={{ mb: 1 }}>
                <RHFCheckbox
                  sx={{ ml: 1 }}
                  name="requested"
                  label="Requested"
                  checked={requested}
                />
              </Grid>
            )}
          </>
        )}
      </Grid>

      <Divider sx={{ mt: 3, mb: 3 }} />

      <Stack direction="row" justifyContent="end" alignItems="center" spacing={1}>
        <LoadingButton
          variant="contained"
          color="primary"
          disabled={Boolean(duplicatedOpportunity) && !isEdit}
          loading={isSubmitting || AIParseLoading}
          type="submit"
        >
          Submit Information
        </LoadingButton>
      </Stack>

      <OpportunityCreateDependencyDialog
        handleComplete={closeOpportunityDependencyDialog}
        model={opportunityDependencyModel}
        open={!!opportunityDependencyModel}
        onClose={closeOpportunityDependencyDialog}
      />
    </FormProvider>
  );
}
