import { Badge, Button, IconButton, Menu, Stack, Typography } from '@mui/material';
import Image from 'src/components/image';
import { useTheme } from '@mui/material/styles';
import { getFileSvg, getFileType } from 'src/utils/format-file';
import { useState } from 'react';
import DownloadAllDocuments from 'src/_requests/opportunity/opportunity/downloadAllDocuments';
import { OpportunityData } from 'src/@types/opportunity/opportunity/opportunityData';
import { useCalculateOpportunityPriceQuery } from 'src/_req-hooks/opportunity/opportunity/useCalculateOpportunityPriceQuery';
import CreateOpportunityOrderCheckoutSession from 'src/_requests/opportunity/bank/createOpportunityOrderCheckoutSession';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { joinUrl } from 'src/utils/url';
import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/hooks';

type DownloadButtonProps = {
  opportunity: OpportunityData;
  isOwner?: boolean;
  isLoading?: boolean;
};

export default function DownloadButton({ opportunity, isOwner, isLoading }: DownloadButtonProps) {
  const theme = useTheme();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [createOpportunityOrderLoading, setCreateOpportunityOrderLoading] = useState(false);
  const { user } = useAuthContext();
  const userRoles = user?.roles;

  const [downloadAllDocumentsLoading, setDownloadAllDocumentsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const { data, isLoading: calculateLoading } = useCalculateOpportunityPriceQuery(
    { id: opportunity.ID },
    { enabled: !isOwner }
  );

  const opportunityPrice = data?.data || { price: 0, prefix: '$', currency: 'USD' };

  const handleDownloadAllDocuments = async () => {
    if (!opportunity?.ID) return;

    try {
      setDownloadAllDocumentsLoading(true);
      const blob = await DownloadAllDocuments(opportunity?.ID.toString());

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `capture411-${opportunity?.solicitation_number || 'opportunity-documents'}-${opportunity.title.substring(
        0,
        20
      )}.zip`;
      a.click();
      setDownloadAllDocumentsLoading(false);
    } catch (error) {
      setDownloadAllDocumentsLoading(false);
      console.error('Error downloading all documents:', error);
      enqueueSnackbar(
        error.message ||
          'You might not have permission to download all documents. Please contact support.',
        {
          variant: 'error',
        }
      );
    }
  };

  const handleBuyAllDocuments = async () => {
    if (!opportunity?.ID) return;

    try {
      setCreateOpportunityOrderLoading(true);
      const result = await CreateOpportunityOrderCheckoutSession({
        opportunity_id: opportunity.ID,
        redirect_path: joinUrl(window.location.origin, paths.dashboard.opportunity.myPipeline),
      });

      const a = document.createElement('a');
      a.href = result.data.session_url;
      setCreateOpportunityOrderLoading(false);
      a.click();
    } catch (error) {
      console.error('Error creating checkout session:', error);
      enqueueSnackbar('Payment is not available. Please try again later or contact support.', {
        variant: 'error',
      });
      setCreateOpportunityOrderLoading(false);
    }
  };

  const documents = opportunity?.documents || [];

  const openActionMenu = Boolean(menuAnchor);

  if (!isOwner && !opportunityPrice.price) {
    return <Stack />;
  }

  const isAdmin = !!userRoles?.find((role) => role.title === 'Admin');
  const isReviewer = !!userRoles?.find((role) => role.title === 'Reviewer');

  return (
    <>
      <Badge
        sx={{
          cursor: 'pointer',
          '& .MuiBadge-badge': {
            width: 20,
            ...(isOwner ? { right: 10 } : { left: -10 }),
            top: 35,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
          },
        }}
        onClick={openMenu}
        badgeContent={opportunity?.documents.length > 0 ? opportunity.documents.length : 0}
        color="info"
      >
        <IconButton
          sx={{
            borderRadius: 1,
          }}
          color="primary"
          onClick={openMenu}
          disabled={documents.length < 1 || !opportunityPrice.price || isLoading}
        >
          {!isOwner ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <Image width={35} src="/assets/icons/files/ic_glass_buy.svg" />
              <Typography variant="subtitle2" color="primary.main">
                {opportunityPrice.prefix + opportunityPrice.price}
              </Typography>
            </Stack>
          ) : (
            <>
              {documents.length > 0 ? (
                <Image src="/assets/icons/files/ic_file.svg" />
              ) : (
                <Image src="/assets/icons/files/ic_temp.svg" />
              )}
            </>
          )}
        </IconButton>
      </Badge>
      <Menu
        anchorEl={menuAnchor}
        onClose={closeMenu}
        open={openActionMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ borderRadius: 2 }}
      >
        <Stack sx={{ width: 428, maxHeight: 510 }}>
          <Stack
            sx={{
              height: 72,
              borderBottom: `1px solid ${theme.palette.divider}`,
              p: 3,
            }}
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!isOwner ? (
              <Image width={35} src="/assets/icons/files/ic_glass_buy.svg" />
            ) : (
              <Image src="/assets/icons/files/ic_file.svg" />
            )}
            <Typography variant="subtitle1">Document List</Typography>
          </Stack>
          <Stack
            sx={{
              height: 72,
              borderBottom: `1px solid ${theme.palette.divider}`,
              p: 3,
            }}
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!isOwner && (
              <LoadingButton
                loading={createOpportunityOrderLoading}
                disabled={!opportunityPrice.price}
                onClick={handleBuyAllDocuments}
                fullWidth
                color="primary"
                variant="text"
                size="large"
              >
                Buy All For{' '}
                {calculateLoading
                  ? 'Calculating...'
                  : `${opportunityPrice.prefix + opportunityPrice.price}`}
              </LoadingButton>
            )}

            {(isAdmin || isReviewer || isOwner) && (
              <LoadingButton
                loading={downloadAllDocumentsLoading}
                onClick={handleDownloadAllDocuments}
                fullWidth
                color="primary"
                variant="text"
                size="large"
              >
                Download All
              </LoadingButton>
            )}
          </Stack>
          {documents.map((doc) => (
            <Stack
              key={doc.file_path}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                p: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Image src={getFileSvg(getFileType(doc.file_path))} width={40} height={40} />
                <Typography variant="subtitle1">
                  {doc.title || 'Unknown file'}&nbsp;
                  {doc.file_path.split('-@')[1] && (
                    <Typography component="span" variant="body2">
                      {doc.file_path.split('-@')[1]}
                    </Typography>
                  )}
                </Typography>
              </Stack>
            </Stack>
          ))}
          <Stack
            sx={{
              height: 72,
              p: 3,
            }}
            alignItems="center"
            justifyContent="end"
            direction="row"
            spacing={2}
          >
            <Button variant="outlined" onClick={closeMenu}>
              Dismiss
            </Button>
          </Stack>
        </Stack>
      </Menu>
    </>
  );
}
