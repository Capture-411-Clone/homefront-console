'use client';

import { LinearProgress, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useCallback, useState } from 'react';
import { AddDocumentRequestBodyType } from 'src/@types/opportunity/opportunity/createOpportunityData';
import { useUploadFileMutation } from 'src/_req-hooks/bytebase/file/useUploadFileMutation';
import { UploadDocument } from 'src/components/upload';

type OpportunityUploadDocumentsDialogProps = {
  addDocument: (doc: AddDocumentRequestBodyType) => void;
  multiple?: boolean;
};

export default function OpportunityUploadDocuments(props: OpportunityUploadDocumentsDialogProps) {
  const { addDocument, multiple = false } = props;

  const [files, setFiles] = useState<(File | string)[] | undefined>();
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: upload, isLoading: loadingUpload } = useUploadFileMutation();

  const handleDropSingleFile = useCallback(async (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => file);
    if (newFiles) {
      setFiles(newFiles);
    }
    try {
      const filesResult = await upload({ files: newFiles });

      filesResult.data.forEach((newFile, i) => {
        addDocument({ file_path: newFile, mainFile: newFiles[i] });
      });
    } catch (err) {
      console.log('upload file error', err);
      setError('Failed to upload file. please contact support');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      <UploadDocument multiple={multiple} files={files} onDrop={handleDropSingleFile} />
      {error && (
        <Typography variant="caption" sx={{ mt: 1 }} color="error">
          {error}
        </Typography>
      )}
      {loadingUpload && <LinearProgress sx={{ mt: 2 }} />}
    </Stack>
  );
}
