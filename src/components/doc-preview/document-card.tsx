import { Icon } from '@iconify/react';
import { Autocomplete, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { AddDocumentRequestBodyType } from 'src/@types/opportunity/opportunity/createOpportunityData';
import { getFileType, getIcon } from 'src/utils/format-file';
import { getDownloadOpportunityDocumentUrl } from 'src/_requests/bytebase/file/downloadOppoDoc';
import { getOpportunityDocumentFileAsBlob } from 'src/_requests/bytebase/file/localDownloadOppoDoc';
import { DocumentTypeEnum } from 'src/@types/redux/opportunity';
import { useUsersQuery } from 'src/_req-hooks/opportunity/user/useUsersQuery';
import { UserData } from 'src/@types/opportunity/user/userData';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import Image from '../image/image';
import { ConfirmDialog } from '../custom-dialog';
import { fileData } from '../file-thumbnail';

interface Props {
  disabled?: boolean;
  rfpExists: boolean;
  document: AddDocumentRequestBodyType;
  excludedTitles: DocumentTypeEnum[];
  onDelete: (document: AddDocumentRequestBodyType) => void;
  setDocumentTitle: (document: AddDocumentRequestBodyType, title: string) => void;
  setDocumentOwner: (document: AddDocumentRequestBodyType, owner: number) => void;
  AIParseLoading: boolean;
}

export default function DocumentCard({
  disabled,
  rfpExists,
  document,
  onDelete,
  excludedTitles,
  setDocumentTitle,
  setDocumentOwner,
  AIParseLoading,
}: Props) {
  const { user } = useAuthContext();
  const userRoles = user?.roles;
  const isAdmin = !!userRoles?.find((role) => role.title === 'Admin');

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const fileType = getFileType(document.file_path);
  const iconPath = getIcon(fileType);

  const [defaultUser, setDefaultUser] = useState<UserData | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);

  const [localDownloadLoading, setLocalDownloadLoading] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handleTitleChange = (_: any, title: any) => {
    setDocumentTitle(document, title);
  };

  const handleOwnerChange = (_: any, owner: any) => {
    setDocumentOwner(document, owner.ID);
  };

  const { data: usersData, isLoading: usersLoading } = useUsersQuery(
    {
      page: 1,
      order: 'asc',
      order_by: 'email',
      per_page: 20000,
      filters: {},
    },
    {
      enabled: isAdmin,
    }
  );

  let documentTypes = [
    DocumentTypeEnum.RFP_RFQ,
    DocumentTypeEnum.Instructions,
    DocumentTypeEnum.SOWs_PWS,
    DocumentTypeEnum.Pricing_Sheets,
    DocumentTypeEnum.Q_And_A,
    DocumentTypeEnum.Other,
  ];

  const downloadFile = useCallback(
    async (fileKey: string) => {
      try {
        setLocalDownloadLoading(fileKey);
        const blob = await getOpportunityDocumentFileAsBlob(fileKey);

        const url = URL.createObjectURL(blob);
        const a = window.document.createElement('a');
        a.href = url;
        a.download = fileKey.split('-@')[1];
        window.document.body.appendChild(a); // Required for Firefox
        setLocalDownloadLoading('');
        a.click();
        window.document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up after the download
      } catch (error) {
        setLocalDownloadLoading('');
        console.error('Download failed:', error);

        enqueueSnackbar(
          error.message || 'Could not download the file. Please Try again or contact us.',
          {
            variant: 'error',
          }
        );
      }
    },
    [enqueueSnackbar]
  );

  documentTypes = rfpExists
    ? documentTypes.filter((doc) => doc !== DocumentTypeEnum.RFP_RFQ)
    : documentTypes;

  documentTypes = documentTypes.filter((doc) => !excludedTitles.includes(doc));

  const handleDeleteDocument = () => {
    console.log('handleDeleteDocument', 'CLICK');
    handleCloseDeleteDialog();
    console.log('handleDeleteDocument', 'after');

    onDelete(document);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    if (usersData?.data?.items) {
      const usrs = usersData.data.items;
      const usr = usrs.find((u) => String(u?.ID) === String(document?.user_id || 0));
      if (usr) {
        setDefaultUser(usr);
      }
      setUsers(usrs);
    }
  }, [usersData, document.user_id]);

  useEffect(() => {
    if (defaultUser && users.length > 0) {
      setDefaultUser((prevUser) => {
        const _u = users.find((u: UserData) => String(u.ID) === String(document.user_id));
        return _u || prevUser;
      });
    }
  }, [users, defaultUser, document.user_id]);

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Stack
          sx={{
            pt: 2,
            width: 80,
            height: 104,
            bgcolor: (theme) => theme.palette.background.neutral,
            borderRadius: 1,
            position: 'relative',
          }}
          justifyContent="center"
          alignItems="center"
        >
          {fileType === 'image' && (
            <Image
              src={fileData(getDownloadOpportunityDocumentUrl(document.file_path)).preview}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 1,
                height: 1,
              }}
            />
          )}

          <Icon icon={iconPath} width={40} height={40} color="grey" />
          {!disabled && (
            <Stack
              sx={{
                position: 'absolute',
                top: 10,
                right: 5,
                cursor: 'pointer',
                bgcolor: (theme) => theme.palette.background.paper,
                borderRadius: '50%',
              }}
              onClick={handleOpenDeleteDialog}
            >
              <Icon icon="mingcute:close-fill" width={15} height={15} color="grey" />
            </Stack>
          )}

          <LoadingButton
            loading={localDownloadLoading === document.file_path}
            disabled={!!localDownloadLoading}
            variant="text"
            color="primary"
            sx={{ mt: 1 }}
            onClick={() => downloadFile(document.file_path)}
          >
            <Icon icon="material-symbols:download" width={20} height={20} />
          </LoadingButton>
        </Stack>

        <Stack spacing={2}>
          <Typography
            sx={{ pt: 1, textAlign: 'left' }}
            color={disabled ? 'text.disabled' : 'text.primary'}
            variant="body1"
          >
            {document.mainFile?.name || document.file_path?.split('@')[1] || 'N/A'}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Autocomplete
              disabled={
                (AIParseLoading &&
                  (document.title === DocumentTypeEnum.RFP_RFQ ||
                    document.title === DocumentTypeEnum.SOWs_PWS)) ||
                disabled
              }
              sx={{ width: 200 }}
              value={document.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={
                    AIParseLoading &&
                    (document.title === DocumentTypeEnum.RFP_RFQ ||
                      document.title === DocumentTypeEnum.SOWs_PWS)
                      ? 'AI Processing ...'
                      : ''
                  }
                  label="Document Type"
                />
              )}
              options={documentTypes}
              onChange={handleTitleChange}
            />

            {isAdmin && user?.email !== 'capture411.help@gmail.com' && (
              <Autocomplete
                disabled={disabled}
                sx={{ width: 300 }}
                value={defaultUser}
                loading={usersLoading}
                renderInput={(params) => <TextField {...params} label="Owner" />}
                options={users}
                getOptionLabel={(option) =>
                  typeof option === 'string'
                    ? option
                    : `${option.email || ''} ${option.email ? '-' : ''} ${option.name || ''} ${option.last_name || ''}`
                }
                onChange={handleOwnerChange}
              />
            )}
          </Stack>
        </Stack>
      </Stack>

      <ConfirmDialog
        open={openDeleteDialog}
        keepMounted
        title={`Delete ${document.title} file?`}
        content="Are you sure you want to delete this file ?"
        action={
          <Button onClick={handleDeleteDocument} variant="contained" color="error">
            Delete
          </Button>
        }
        onClose={handleCloseDeleteDialog}
      />
    </>
  );
}
