'use client';

import { Box, Stack } from '@mui/system';
import { DocumentTypeEnum } from 'src/@types/redux/opportunity';
import { OpportunityData } from 'src/@types/opportunity/opportunity/opportunityData';
import OpportunityNewEditDocuments from 'src/sections/opportunity/opportunity-new-edit-steps/opportunity-new-edit-documents';
import OpportunityNewEditInformation from 'src/sections/opportunity/opportunity-new-edit-steps/opportunity-new-edit-information';
import { useDispatch } from 'src/redux/store';
import { opportunityGuessedDataChanged } from 'src/redux/slices/opportunity';
import { Button, Card, Collapse, Divider, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { AddDocumentRequestBodyType } from 'src/@types/opportunity/opportunity/createOpportunityData';
import { useOpportunityAIDocValuesMutation } from 'src/_req-hooks/opportunity/ai-models/useOpportunityAIDocValuesMutation';
import { useAuthContext } from 'src/auth/hooks';
import { useGetAllOpportunityOwnedIDsQuery } from 'src/_req-hooks/opportunity/order/useGetAllOpportunityOwnedIDsQuery';
import DownloadButton from './opportunity-menues/download-button';

type OpportunityNewEditFormProps = {
  isEdit?: boolean;
  currentOpportunity?: OpportunityData;
  refetchOpportunity?: () => void;
};

export default function OpportunityNewEditForm({
  isEdit,
  currentOpportunity,
  refetchOpportunity,
}: OpportunityNewEditFormProps) {
  const dispatch = useDispatch();

  const [documents, setDocuments] = useState<AddDocumentRequestBodyType[]>(
    currentOpportunity?.documents || []
  );

  const { user } = useAuthContext();
  const userRoles = user?.roles;
  const isAdmin = !!userRoles?.find((role) => role.title === 'Admin');
  const isReviewer = !!userRoles?.find((role) => role.title === 'Reviewer');

  const { data: ownedData, isLoading: getOwnedLoading } = useGetAllOpportunityOwnedIDsQuery();
  const opportunityOwnedIDs = ownedData?.data;

  useEffect(() => {
    if (!isEdit) {
      setDocuments([]);
    }
    if (currentOpportunity) {
      setDocuments(currentOpportunity.documents || []);
    }
  }, [currentOpportunity, isEdit]);

  // const { mutateAsync: opportunityPdfDocValues } = useOpportunityPdfDocValuesMutation();
  const { mutateAsync: opportunityAIDocValues } = useOpportunityAIDocValuesMutation();

  const [informationOpen, setInformationOpen] = useState(!!currentOpportunity?.documents.length);

  const toggleInformationOpen = () => {
    setInformationOpen((prev) => !prev);
  };

  const [gptParseLoading, setGptParseLoading] = useState(false);
  const [AIParseLoading, setAIParseLoading] = useState(false);

  const AIParseDocument = useCallback(
    async (doc: AddDocumentRequestBodyType) => {
      if (doc.title === DocumentTypeEnum.RFP_RFQ || doc.title === DocumentTypeEnum.SOWs_PWS) {
        // download file from rfpRfqDocument.file_path
        try {
          setAIParseLoading(true);

          const result = await opportunityAIDocValues({
            file_object_key: doc.file_path,
          });
          console.log('pdf-doc-values:', result.data);

          dispatch(opportunityGuessedDataChanged(result.data.result));
          setAIParseLoading(false);
        } catch (e) {
          setAIParseLoading(false);
          console.log(e);
        }
      }
    },
    [dispatch, opportunityAIDocValues]
  );

  // const gptParseDocument = useCallback(
  //   async (doc: AddDocumentRequestBodyType) => {
  //     if (doc.title === DocumentTypeEnum.RFP_RFQ) {
  //       // download file from rfpRfqDocument.file_path
  //       try {
  //         setGptParseLoading(true);
  //         // Get the file as a blob
  //         const blob = await getFileAsBlob(doc.file_path);

  //         // Convert blob to File object
  //         const file = new File([blob], doc.file_path);

  //         const result = await opportunityPdfDocValues({ files: [file] });
  //         console.log('pdf-doc-values:', result.data);

  //         dispatch(opportunityGuessedDataChanged(result.data));
  //         setGptParseLoading(false);
  //       } catch (e) {
  //         setGptParseLoading(false);
  //         console.log(e);
  //       }
  //     }
  //   },
  //   [dispatch, opportunityPdfDocValues]
  // );

  useEffect(() => {
    setInformationOpen(!!documents.length);
  }, [documents, gptParseLoading]);

  return (
    <Card sx={{ position: 'relative' }}>
      {Boolean(currentOpportunity?.documents?.length) && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 30,
            zIndex: 1,
          }}
        >
          {currentOpportunity && (
            <DownloadButton
              isLoading={getOwnedLoading}
              isOwner={opportunityOwnedIDs?.includes(currentOpportunity.ID)}
              opportunity={currentOpportunity}
            />
          )}
        </Box>
      )}
      <Box px={4} py={3}>
        {(isAdmin || isReviewer) && user?.email !== 'capture411.help@gmail.com' && (
          <Stack pl={1} mb={2}>
            {Boolean(currentOpportunity?.staff_id) && (
              <Box>
                <Typography variant="overline">Staff</Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentOpportunity?.staff?.email}
                </Typography>
              </Box>
            )}
            {Boolean(currentOpportunity?.documents?.length) && (
              <Box>
                <Typography variant="overline">Contributors</Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentOpportunity?.documents
                    ?.map((doc) => doc?.user?.email)
                    .filter((email, index, self) => email && self.indexOf(email) === index)
                    .join(', ') || 'N/A'}
                </Typography>
              </Box>
            )}
            {currentOpportunity?.requested && (
              <Box>
                <Typography variant="overline">Requestor</Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentOpportunity?.user.email || 'N/A'}
                </Typography>
              </Box>
            )}
          </Stack>
        )}
        <OpportunityNewEditDocuments
          multiple
          documents={documents}
          AIParseDocument={AIParseDocument}
          AIParseLoading={AIParseLoading}
          setDocuments={setDocuments}
          currentOpportunity={currentOpportunity}
        />
        <Stack spacing={2} direction="row" alignItems="center" my={4}>
          <Divider sx={{ flex: 1 }} />
          <Button onClick={toggleInformationOpen} variant="text">
            {informationOpen ? 'Hide' : 'Show'} Information
          </Button>
        </Stack>
        <Box pt={2} />

        <Collapse in={informationOpen}>
          <OpportunityNewEditInformation
            isEdit={isEdit}
            documents={documents}
            setDocuments={setDocuments}
            AIParseLoading={AIParseLoading}
            AIParseDocument={AIParseDocument}
            refetchOpportunity={refetchOpportunity}
            currentOpportunity={currentOpportunity}
          />
        </Collapse>
      </Box>
    </Card>
  );
}
