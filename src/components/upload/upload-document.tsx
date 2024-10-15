import { useDropzone } from 'react-dropzone';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// assets
import { UploadIllustration } from 'src/assets/illustrations';
//
import Iconify from '../iconify';
//
import { UploadProps } from './types';
import RejectionFiles from './errors-rejection-files';

// ----------------------------------------------------------------------

export default function UploadDocument({
  disabled,
  multiple = false,
  error,
  helperText,
  //
  file,
  onDelete,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    disabled,
    accept: {
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/vnd.ms-excel': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'application/vnd.ms-powerpoint': [],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': [],
      'text/plain': [],
      'image/*': [],
      'video/*': [],
      // apple formats
      'application/vnd.apple.keynote': [],
      'application/vnd.apple.pages': [],
      'application/vnd.apple.numbers': [],
      // google formats
      'application/vnd.google-apps.document': [],
      'application/vnd.google-apps.spreadsheet': [],
      'application/vnd.google-apps.presentation': [],
      'application/vnd.google-apps.form': [],
    },
    ...other,
  });

  const hasFile = !!file && !multiple;

  const hasError = isDragReject || !!error;

  const renderPlaceholder = (
    <Stack spacing={3} alignItems="center" justifyContent="center" flexWrap="wrap">
      <UploadIllustration sx={{ width: 1, maxWidth: 200 }} />
      <Stack spacing={1} sx={{ textAlign: 'center' }}>
        <Typography variant="h6">Drop or Select file</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Drop files here or click
          <Box
            component="span"
            sx={{
              mx: 0.5,
              color: 'primary.main',
              textDecoration: 'underline',
            }}
          >
            browse
          </Box>
          thorough your machine
        </Typography>
      </Stack>
    </Stack>
  );

  const removeSinglePreview = hasFile && onDelete && (
    <IconButton
      size="small"
      onClick={onDelete}
      sx={{
        top: 16,
        right: 16,
        zIndex: 9,
        position: 'absolute',
        color: (theme) => alpha(theme.palette.common.white, 0.8),
        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
        },
      }}
    >
      <Iconify icon="mingcute:close-line" width={18} />
    </IconButton>
  );

  return (
    <Box sx={{ width: 1, position: 'relative', ...sx }}>
      <Box
        {...getRootProps()}
        sx={{
          p: 5,
          outline: 'none',
          borderRadius: 1,
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
          transition: (theme) => theme.transitions.create(['opacity', 'padding']),
          '&:hover': {
            opacity: 0.72,
          },
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
          }),
          ...(hasError && {
            color: 'error.main',
            borderColor: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
          ...(hasFile && {
            padding: '50px 0',
          }),
        }}
      >
        <input {...getInputProps()} />

        {hasFile ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Iconify width={150} color="text.secondary" icon="tabler:file-filled" />
          </Box>
        ) : (
          renderPlaceholder
        )}
      </Box>

      {removeSinglePreview}

      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />
    </Box>
  );
}
