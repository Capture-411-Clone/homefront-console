'use client';

import { Card, Collapse, Divider, Grid, TextField, Typography } from '@mui/material';
// @mui
import Container from '@mui/material/Container';
import { Stack } from '@mui/system';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { useCallback, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import OpportunityNewEditDocuments from 'src/sections/opportunity/opportunity-new-edit-steps/opportunity-new-edit-documents';
import { AddDocumentRequestBodyType } from 'src/@types/opportunity/opportunity/createOpportunityData';
import { DocumentTypeEnum } from 'src/@types/redux/opportunity';
import { useOpportunityAIAllDocValuesMutation } from 'src/_req-hooks/opportunity/ai-models/useOpportunityAIAllDocValuesMutation';
import { OpportunityAIAllDocValuesResult } from 'src/@types/opportunity/ai-models/opportunityAIAllDocValues';
import Iconify from 'src/components/iconify';
import { useCreateEntitiesMutation } from 'src/_req-hooks/opportunity/entity-hunt/useCreateEntitiesMutation';
import { useSnackbar } from 'notistack';
import { useEntitiesQuery } from 'src/_req-hooks/opportunity/entity-hunt/useEntitiesQuery';
import { useJsonDownload } from 'src/hooks/use-json-download';

// ----------------------------------------------------------------------

export type EntityItem = {
  id: string; // Added id
  value: string;
  sentence: string;
  correct: boolean;
  custom: boolean;
};

export type EntityData = {
  CONTRACT_VEHICLE: EntityItem[];
  NAICS: EntityItem[];
  SET_ASIDE: EntityItem[];
  AGENCY: EntityItem[];
  OFFICE: EntityItem[];
  DEPARTMENT: EntityItem[];
  FISCAL_YEAR: EntityItem[];
  SOLICITATION_NUMBER: EntityItem[];
  DESCRIPTION: EntityItem[];
  TITLE: EntityItem[];
};

export default function EntHunterView() {
  const [lastId, setLastId] = useState<string>('');

  const [DocDetailsResult, setDocDetailsResult] = useState<OpportunityAIAllDocValuesResult>({
    TITLE: [],
    DESCRIPTION: [],
    SOLICITATION_NUMBER: [],
    DEPARTMENT: [],
    AGENCY: [],
    OFFICE: [],
    CONTRACT_VEHICLE: [],
    SET_ASIDE: [],
    FISCAL_YEAR: [],
    NAICS: [],
  });

  const [data, setData] = useState<EntityData | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const [openMore, setOpenMore] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const { mutateAsync: createEntities, isLoading: createEntitiesLoading } =
    useCreateEntitiesMutation();

  const {
    data: entityData,
    refetch: getEntityData,
    isFetching: isGetEntityDataLoading,
  } = useEntitiesQuery(
    {
      last_visited_id: lastId,
    },
    { enabled: false }
  );

  const initializeData = (): EntityData => ({
    CONTRACT_VEHICLE: [],
    NAICS: [],
    SET_ASIDE: [],
    AGENCY: [],
    OFFICE: [],
    DEPARTMENT: [],
    FISCAL_YEAR: [],
    SOLICITATION_NUMBER: [],
    DESCRIPTION: [],
    TITLE: [],
  });

  const { downloadJson, isLoading: isDownloadJsonLoading } = useJsonDownload();

  useEffect(() => {
    if (entityData?.data && !isDataFetched) {
      const { items } = entityData.data;

      if (items?.length > 0) {
        downloadJson(items, `data${lastId ? `with-lastId-${lastId}` : ''}.json`);
      } else {
        enqueueSnackbar('No data found', { variant: 'error' });
      }
      setIsDataFetched(true);
      setLastId('');
    }
  }, [entityData, downloadJson, enqueueSnackbar, isDataFetched, lastId]);

  const onDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [keyName, fieldName] = name.split('__');

    setData((prev) => {
      const updatedPrev = prev || initializeData();
      const items = updatedPrev[keyName as keyof EntityData] || [];
      const customItemIndex = items.findIndex((item) => item.custom);

      if (customItemIndex !== -1) {
        const updatedItems = [...items];
        updatedItems[customItemIndex] = {
          ...updatedItems[customItemIndex],
          [fieldName]: value,
          custom: true,
        };
        return {
          ...updatedPrev,
          [keyName]: updatedItems,
        };
      }
      const newCustomItem: EntityItem = {
        id: `custom-${Date.now()}`, // Generate a unique id
        value: fieldName === 'value' ? value : '',
        sentence: fieldName === 'sentence' ? value : '',
        correct: false,
        custom: true,
      };
      return {
        ...updatedPrev,
        [keyName]: [...items, newCustomItem],
      };
    });
  };

  const onLastIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastId(e.target.value);
  };

  const [documents, setDocuments] = useState<AddDocumentRequestBodyType[]>([]);

  const { mutateAsync: opportunityAIAllDocValues, isLoading: AIParseLoading } =
    useOpportunityAIAllDocValuesMutation();

  const AIParseDocument = useCallback(
    async (doc: AddDocumentRequestBodyType) => {
      if (doc.title === DocumentTypeEnum.RFP_RFQ || doc.title === DocumentTypeEnum.SOWs_PWS) {
        try {
          const result = await opportunityAIAllDocValues({
            file_object_key: doc.file_path,
          });

          console.log('pdf-doc-values:', result.data);

          setDocDetailsResult(result.data.result);

          setData(() => {
            const initialData = initializeData();
            Object.keys(result.data.result).forEach((key) => {
              const items = result.data.result[key as keyof OpportunityAIAllDocValuesResult] || [];
              initialData[key as keyof EntityData] = items.map((i, index) => ({
                ...i,
                id: `${key}-${index}`, // Assign a unique id
                correct: false,
                custom: false,
              }));
            });
            return initialData;
          });

          setOpenMore(true);
        } catch (e) {
          console.log(e);
        }
      } else {
        // Handle other document types or show a message
        console.log('Unsupported document type for AI parsing.');
      }
    },
    [opportunityAIAllDocValues]
  );

  const onSubmit = async () => {
    const _data = cleanData(data);
    try {
      await createEntities({
        solicitation_number:
          _data?.SOLICITATION_NUMBER?.find((i) => i.custom)?.value ||
          _data?.SOLICITATION_NUMBER?.find((i) => i.correct)?.value ||
          '',
        details: JSON.stringify(_data),
        year:
          _data?.FISCAL_YEAR?.find((i) => i.custom)?.value ||
          _data?.FISCAL_YEAR?.find((i) => i.correct)?.value ||
          '',
        file_name: documents?.[0]?.mainFile?.name || '',
        file_path: documents?.[0]?.file_path || '',
      });
      enqueueSnackbar('Data submitted successfully', {
        variant: 'success',
      });

      // Reset data
      setData(initializeData());
      setDocuments([]);
    } catch (e) {
      console.log('Error submitting data', e);
      enqueueSnackbar('Error submitting data', {
        variant: 'error',
      });
    }
  };

  const cleanData = (d: EntityData | null): EntityData | null => {
    if (!d) return d;
    const cleanedData: EntityData = initializeData();

    Object.keys(d).forEach((key) => {
      const items = d[key as keyof EntityData];
      const filteredItems = items.filter(
        (item) =>
          item.value.trim() !== '' && item.sentence.trim() !== '' && (item.correct || item.custom)
      );

      if (filteredItems.length > 0) {
        cleanedData[key as keyof EntityData] = filteredItems;
      }
    });

    return cleanedData;
  };

  const canSubmit = data && Object.keys(cleanData(data) || {}).length > 0;

  const fetchDataBasedOnLastId = () => {
    setIsDataFetched(false);
    getEntityData();
  };

  return (
    <Container sx={{ pt: 10, pb: 5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Opportunity', href: paths.dashboard.opportunity.root },
            { name: 'List' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            type="number"
            label="Last ID"
            sx={{ width: 100 }}
            size="medium"
            variant="standard"
            onChange={onLastIdChange}
            value={lastId}
          />

          <LoadingButton
            loading={isGetEntityDataLoading || isDownloadJsonLoading}
            size="large"
            variant="contained"
            color="primary"
            onClick={() => {
              fetchDataBasedOnLastId();
            }}
          >
            Get Data
          </LoadingButton>
        </Stack>
      </Stack>

      <Stack mt={2}>
        <OpportunityNewEditDocuments
          noBanner
          documents={documents}
          AIParseDocument={AIParseDocument}
          AIParseLoading={AIParseLoading}
          setDocuments={setDocuments}
        />
      </Stack>

      <Stack spacing={2} direction="row" alignItems="center" mt={4}>
        <Divider sx={{ flex: 1 }} />
        <LoadingButton
          loading={AIParseLoading}
          variant="text"
          onClick={() => setOpenMore((prev) => !prev)}
        >
          {openMore ? 'Hide' : 'Show'} Inputs
        </LoadingButton>
      </Stack>

      <Stack spacing={2} mt={4}>
        <Collapse in={openMore}>
          {Object.keys(DocDetailsResult).map((key) => (
            <Stack sx={{ p: 2, mt: 1, bgcolor: 'background.neutral', borderRadius: 1 }} key={key}>
              <Typography variant="subtitle1" sx={{ display: 'flex' }} alignItems="center">
                <Iconify icon="clarity:document-solid" sx={{ mr: 1 }} />
                {key}
              </Typography>
              <Grid container direction="row" spacing={2} pt={2}>
                {DocDetailsResult[key as keyof OpportunityAIAllDocValuesResult]?.length ? (
                  data?.[key as keyof EntityData]?.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={4}>
                      <Card
                        onClick={() => {
                          if (!data) return;
                          setData((prev) => {
                            const updatedPrev = prev || initializeData();
                            const items = updatedPrev[key as keyof EntityData] || [];
                            const updatedItems = items.map((i) =>
                              i.id === item.id ? { ...i, correct: !i.correct } : i
                            );
                            return {
                              ...updatedPrev,
                              [key]: updatedItems,
                            };
                          });
                        }}
                        sx={{
                          p: 2,
                          bgcolor: item.correct ? 'warning.lighter' : 'background.paper',
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: 'grey.100', transition: 'all linear 0.3s' },
                        }}
                      >
                        <Typography variant="subtitle1">{item.value}</Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body1">{item.sentence}</Typography>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Typography
                    sx={{ width: '100%' }}
                    variant="subtitle2"
                    textAlign="center"
                    color="text.secondary"
                  >
                    No data found by the AI Model
                  </Typography>
                )}
              </Grid>
              <Stack
                sx={{ backgroundColor: 'background.paper', p: 2, borderRadius: 1, mt: 2 }}
                spacing={2}
              >
                <Typography variant="subtitle1">Custom Data</Typography>
                <TextField
                  label="Value"
                  name={`${key}__value`}
                  value={data?.[key as keyof EntityData]?.find((i) => i.custom)?.value || ''}
                  onChange={onDataChange}
                />
                <TextField
                  label="Block Sentence"
                  name={`${key}__sentence`}
                  value={data?.[key as keyof EntityData]?.find((i) => i.custom)?.sentence || ''}
                  multiline
                  rows={5}
                  onChange={onDataChange}
                />
              </Stack>
            </Stack>
          ))}
        </Collapse>
      </Stack>

      <Stack mt={3}>
        <LoadingButton
          loading={createEntitiesLoading}
          disabled={!canSubmit}
          variant="contained"
          color="primary"
          size="large"
          onClick={onSubmit}
        >
          Submit Data
        </LoadingButton>
      </Stack>
    </Container>
  );
}
