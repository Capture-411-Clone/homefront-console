import React, { useEffect } from 'react';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { OpportunityData } from 'src/@types/opportunity/opportunity/opportunityData';

import { DocumentCard } from 'src/components/doc-preview';

import { Box } from '@mui/system';
import {} from 'src/redux/slices/opportunity';
// import DownloadAllDocuments from 'src/_requests/opportunity/opportunity/downloadAllDocuments';
import { DocumentTypeEnum } from 'src/@types/redux/opportunity';
import { AddDocumentRequestBodyType } from 'src/@types/opportunity/opportunity/createOpportunityData';
import { useSearchParams } from 'src/routes/hooks';
import { useAuthContext } from 'src/auth/hooks';
import OpportunityUploadDocuments from '../view/opportunity-upload-documents';

type OpportunityNewEditDocumentsProps = {
  multiple?: boolean;
  noBanner?: boolean;
  documents: AddDocumentRequestBodyType[];
  setDocuments: React.Dispatch<React.SetStateAction<AddDocumentRequestBodyType[]>>;
  currentOpportunity?: OpportunityData | null;
  AIParseDocument: (doc: AddDocumentRequestBodyType) => Promise<void>;
  AIParseLoading: boolean;
};

export default function OpportunityNewEditDocuments({
  multiple = false,
  noBanner,
  documents,
  setDocuments,
  currentOpportunity,
  AIParseDocument,
  AIParseLoading,
}: OpportunityNewEditDocumentsProps) {
  //---------------------------------------------------------------------------------------------
  const { user } = useAuthContext();
  const userRoles = user?.roles;

  const isAdmin = !!userRoles?.find((role) => role.title === 'Admin');
  const isReviewer = !!userRoles?.find((role) => role.title === 'Reviewer');

  const searchParams = useSearchParams();
  const duplicate = searchParams.get('duplicate');

  const isDuplicate = duplicate === 'true';

  const addDocument = async (doc: AddDocumentRequestBodyType) => {
    setDocuments((prev) => [...prev, doc]);
  };

  useEffect(() => {
    if (currentOpportunity) {
      setDocuments(currentOpportunity.documents || []);
    }
  }, [currentOpportunity, setDocuments]);

  const deleteDocument = (doc: AddDocumentRequestBodyType) => {
    setDocuments((prev) => prev.filter((item) => item.file_path !== doc.file_path));
  };

  const handleSetDocumentTitle = async (doc: AddDocumentRequestBodyType, title: string) => {
    setDocuments((prev) =>
      prev.map((item) => {
        if (item.file_path === doc.file_path) {
          return { ...item, title };
        }
        return item;
      })
    );

    if (title === DocumentTypeEnum.RFP_RFQ || title === DocumentTypeEnum.SOWs_PWS) {
      await AIParseDocument({ ...doc, title });
    }
  };

  const handleSetDocumentOwner = async (doc: AddDocumentRequestBodyType, ownerID: number) => {
    setDocuments((prev) =>
      prev.map((item) => {
        if (item.file_path === doc.file_path) {
          return { ...item, user_id: ownerID };
        }
        return item;
      })
    );
  };

  // const handleDownloadAllDocuments = async () => {
  //   if (!currentOpportunity?.ID) return;

  //   const blob = await DownloadAllDocuments(currentOpportunity?.ID.toString());

  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = `capture411-${
  //     currentOpportunity?.solicitation_number || 'opportunity-documents'
  //   }-${currentOpportunity.title}.zip`;
  //   a.click();
  // };

  const rfpExists = documents?.some((doc) => doc.title === DocumentTypeEnum.RFP_RFQ);
  const excludedTitles: DocumentTypeEnum[] = isDuplicate
    ? (documents.map((doc) => doc.title) as DocumentTypeEnum[])
    : [];

  return (
    <>
      {!noBanner && (
        <>
          <Typography sx={{ ml: 1 }} variant="subtitle2" color="text.secondary">
            The RFP/RFQ or SOW will be AI processed and extracted data will fill the next form
            automatically if usefull data found.
          </Typography>

          <Typography sx={{ ml: 1, mt: 1 }} variant="subtitle1" color="info.main">
            Please insert the RFP/RFQ or SOW document first so we can process it with AI and find
            out if we already have this opportunity in our database based on the solicitation
            number.
          </Typography>

          <Divider sx={{ mt: 3 }} />
        </>
      )}

      <Stack justifyContent="space-between" direction="row" textAlign="right">
        <Box />
        {/* {documents.length && currentOpportunity?.ID ? (
          <Button
            onClick={handleDownloadAllDocuments}
            variant="outlined"
            color="primary"
            size="large"
          >
            Download All
          </Button>
        ) : (
          <Box />
        )} */}
        {/* <Button
          disabled={AIParseLoading || parseDocLoading}
          onClick={openUploadDocument}
          variant="contained"
          color="primary"
          size="large"
        >
          {AIParseLoading || parseDocLoading ? 'AI Processing' : 'Add Document'}
        </Button> */}
      </Stack>

      <Box sx={{ mb: 2 }} />

      <OpportunityUploadDocuments addDocument={addDocument} multiple={multiple} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          {documents.length ? (
            <Stack spacing={2}>
              {documents.map((doc) => (
                <DocumentCard
                  disabled={
                    doc.user_id !== undefined &&
                    doc.user_id !== 0 &&
                    doc.staff_id !== undefined &&
                    doc.staff_id !== 0 &&
                    isDuplicate &&
                    !isAdmin &&
                    !isReviewer
                  }
                  document={doc}
                  key={doc.file_path + doc.ID}
                  rfpExists={rfpExists}
                  excludedTitles={excludedTitles}
                  AIParseLoading={AIParseLoading}
                  setDocumentTitle={handleSetDocumentTitle}
                  setDocumentOwner={handleSetDocumentOwner}
                  onDelete={(document: AddDocumentRequestBodyType) => deleteDocument(document)}
                />
              ))}
            </Stack>
          ) : (
            // center
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 100,
              }}
            >
              <Typography color="text.secondary" variant="subtitle1" sx={{ mb: 2 }}>
                No Document Added
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}
