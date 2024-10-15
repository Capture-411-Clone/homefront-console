import {
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import DownloadButton from 'src/sections/opportunity/opportunity-menues/download-button';
import React, { useCallback, useState } from 'react';
import { OpportunityData } from 'src/@types/opportunity/opportunity/opportunityData';
import { useSnackbar } from 'notistack';
import { useRouter } from 'src/routes/hooks';
import { format } from 'date-fns';
import { useWishListQuery } from 'src/_req-hooks/opportunity/wishList/useWishListQuery';
import { paths } from 'src/routes/paths';
import { useDeleteOpportunityMutation } from 'src/_req-hooks/opportunity/opportunity/useDeleteOpportunityMutation';
import { useCreateWishListMutation } from 'src/_req-hooks/opportunity/wishList/useCreateWhishListMutation';
import { useDeleteWishListMutation } from 'src/_req-hooks/opportunity/wishList/useDeleteWishListMutation';
import { useAuthContext } from 'src/auth/hooks';
import { fNumber } from 'src/utils/format-number';
import Link from 'next/link';
import { ConfirmDialog } from '../custom-dialog';
import Iconify from '../iconify';
import DescriptionPopup from '../../sections/opportunity/opportunity-menues/description-popover';

const RootStyle = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
}));

//-------------------------------------------------------------------------
type ActionsMenuProps = {
  opportunity?: OpportunityData | undefined;
  reloadOpportunity: () => void;
  noEdit?: boolean;
};

function ActionsMenu({ opportunity, reloadOpportunity, noEdit }: ActionsMenuProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const [wished, setWished] = useState<boolean>(false);

  const router = useRouter();
  const openActionMenu = Boolean(menuAnchor);

  const { data: wishData, refetch } = useWishListQuery({});

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    const dataCheck = wishData?.data.items.find((i) => i.opportunity_id === opportunity?.ID);
    if (dataCheck !== undefined) {
      setWished(true);
      refetch();
    } else {
      setWished(false);
    }
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const handleEditOpportunity = useCallback(() => {
    closeMenu();
    if (!opportunity) return;
    router.push(paths.dashboard.opportunity.edit(opportunity.ID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunity]);

  const { mutateAsync: deleteOpportunity, isLoading } = useDeleteOpportunityMutation();

  const { mutateAsync: AddWishList } = useCreateWishListMutation();
  const { mutateAsync: RemoveWish } = useDeleteWishListMutation();

  const handleAddWishList = useCallback(async () => {
    closeMenu();
    if (!opportunity) return;

    refetch();
    try {
      if (wishData?.data.items.find((i) => i.opportunity_id === opportunity?.ID) === undefined) {
        await AddWishList({
          opportunity_id: opportunity.ID,
        });
        refetch();
        enqueueSnackbar('Opportunity Add to wish list successfully', {
          variant: 'success',
        });
      } else {
        await RemoveWish({
          ids: wishData?.data.items
            .filter((i) => i.opportunity_id === opportunity?.ID)[0]
            .ID.toString(),
        });
        refetch();
        enqueueSnackbar('Opportunity Removed from wish list successfully', {
          variant: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar('There is an error while doing this action.', { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunity, wishData?.data.items]);

  const openDeleteDialog = useCallback(() => {
    closeMenu();
    setDeleteDialogOpen(true);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  const handleDeleteOpportunity = useCallback(async () => {
    if (!opportunity) return;
    try {
      await deleteOpportunity({ ids: opportunity.ID.toString() });
      enqueueSnackbar('Opportunity deleted successfully', {
        variant: 'success',
      });
      reloadOpportunity();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.data, { variant: 'error' });
    }
    closeDeleteDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunity, deleteOpportunity]);

  return (
    <>
      <IconButton sx={{ width: 40, height: 40 }} onClick={openMenu}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        onClose={closeMenu}
        open={openActionMenu}
        sx={{ width: 250 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleAddWishList}>
          <Iconify icon={wished ? 'mdi:heart' : 'mdi:heart-outline'} sx={{ mr: 1 }} />
          {wished ? 'Wishlist' : 'Wishlist'}
        </MenuItem>

        {!noEdit && (
          <MenuItem onClick={handleEditOpportunity}>
            <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
        )}
        <MenuItem onClick={openDeleteDialog}>
          <Iconify icon="bxs:trash" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Contribution"
        onClose={closeDeleteDialog}
        content={
          <>
            Are you sure want to delete <strong> {opportunity?.title} </strong> contribution?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isLoading}
            onClick={handleDeleteOpportunity}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}

//-------------------------------------------------------------------------

interface OpportunityCardProps {
  opportunityData: OpportunityData;
  requestMode?: boolean;
  refetch: any;
  opportunityOwnedIDs?: number[];
}

export default function OpportunityCard(props: OpportunityCardProps) {
  const { opportunityData, refetch, requestMode, opportunityOwnedIDs } = props;

  const { user } = useAuthContext();
  const userRoles = user?.roles;
  const isAdmin = !!userRoles?.find((role) => role.title === 'Admin');
  const isReviewer = !!userRoles?.find((role) => role.title === 'Reviewer');

  return (
    <RootStyle>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1, pt: 1, pb: 2 }}
      >
        {opportunityData.is_draft ? (
          <Typography variant="subtitle1" sx={{ px: 2 }} color="warning.dark">
            Draft Documents
          </Typography>
        ) : (
          <div />
        )}
        <ActionsMenu
          noEdit={requestMode || !isAdmin || !isReviewer}
          opportunity={opportunityData}
          reloadOpportunity={refetch}
        />
      </Stack>
      <Typography
        variant="subtitle1"
        sx={{ px: 2 }}
        color={opportunityData.title ? 'text.primary' : 'text.disabled'}
      >
        {opportunityData.title || 'N/A'}
      </Typography>
      <Typography variant="body2" color="text.disabled" sx={{ px: 2, pt: 0.7 }}>
        Updated: {format(new Date(opportunityData.updated_at), 'dd MMM yyyy')}
        {opportunityData.deprecated && (
          <Typography component="span" variant="subtitle2" color="grey.600">
            {' '}
            - Deprecated
          </Typography>
        )}
        {opportunityData.duplicated && (isAdmin || isReviewer) && (
          <Typography component="span" variant="subtitle2" color="error.dark">
            {' '}
            - Duplicated
          </Typography>
        )}
      </Typography>
      <Divider sx={{ borderStyle: 'dashed', my: 2 }} />
      <Grid container spacing={1} sx={{ px: 2, pb: 3 }}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Stack spacing={0.5}>
              <Typography variant="overline" sx={{ textTransform: 'uppercase' }}>
                Contract Value
              </Typography>
              <Typography
                variant="body2"
                sx={{ textTransform: 'uppercase' }}
                color="text.secondary"
              >
                {opportunityData.crawler_contract_value || opportunityData.user_contract_value
                  ? `$${fNumber(opportunityData.crawler_contract_value || opportunityData.user_contract_value)}`
                  : 'N/A'}
              </Typography>
            </Stack>
            <Iconify icon="arcticons:openai-chatgpt" width={28} height={28} color="primary.main" />
          </Stack>
        </Grid>
        <Grid item xs={6} spacing={0.5}>
          <Typography variant="overline">Market</Typography>
          <Typography variant="body2" sx={{ textTransform: 'uppercase' }} color="text.secondary">
            {opportunityData?.market || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={6} spacing={0.5}>
          <Typography variant="overline">Department</Typography>
          <Typography variant="body2" sx={{ textTransform: 'uppercase' }} color="text.secondary">
            {opportunityData?.department || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={6} spacing={0.5}>
          <Typography variant="overline">Agency</Typography>
          <Typography variant="body2" sx={{ textTransform: 'uppercase' }} color="text.secondary">
            {opportunityData?.agency || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={6} spacing={0.5}>
          <Typography variant="overline">Office</Typography>
          <Typography variant="body2" sx={{ textTransform: 'uppercase' }} color="text.secondary">
            {opportunityData?.office || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={6} spacing={0.5}>
          <Typography variant="overline">NAICS</Typography>
          <Typography variant="body2" sx={{ textTransform: 'uppercase' }} color="text.secondary">
            {opportunityData?.naics || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={6} spacing={0.5}>
          <Typography variant="overline">Year Issued</Typography>
          <Typography variant="body2" sx={{ textTransform: 'uppercase' }} color="text.secondary">
            {opportunityData?.fiscal_year || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={6} spacing={0.5}>
          <Typography variant="overline">Set Aside</Typography>
          <Typography variant="body2" sx={{ textTransform: 'uppercase' }} color="text.secondary">
            {opportunityData?.set_aside || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={6} spacing={0.5}>
          <Typography variant="overline">Contract Vehicle</Typography>
          <Typography variant="body2" color="text.secondary">
            {opportunityData?.contract_vehicle || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={6} spacing={0.5}>
          <Typography variant="overline">Solicitation Number</Typography>
          <Typography variant="body2" color="text.secondary">
            {opportunityData?.solicitation_number || 'N/A'}
          </Typography>
        </Grid>
        {(isAdmin || isReviewer) &&
          user?.email !== 'capture411.help@gmail.com' &&
          opportunityData.staff_id && (
            <Grid item xs={12} spacing={0.5}>
              <Typography variant="overline">Staff</Typography>
              <Typography variant="body2" color="text.secondary">
                {opportunityData.staff?.email}
              </Typography>
            </Grid>
          )}
        {(isAdmin || isReviewer) && user?.email !== 'capture411.help@gmail.com' && (
          <Grid item xs={12} spacing={0.5}>
            <Typography variant="overline">Contributors</Typography>
            <Typography variant="body2" color="text.secondary">
              {opportunityData?.documents
                ?.map((doc) => doc?.user?.email)
                .filter((email, index, self) => email && self.indexOf(email) === index)
                .join(', ') || 'N/A'}
            </Typography>
          </Grid>
        )}
        {(isAdmin || isReviewer) &&
          user?.email !== 'capture411.help@gmail.com' &&
          opportunityData?.requested && (
            <Grid item xs={12} spacing={0.5}>
              <Typography variant="overline">Requestor</Typography>
              <Typography variant="body2" color="text.secondary">
                {opportunityData?.user.email || 'N/A'}
              </Typography>
            </Grid>
          )}
      </Grid>
      <Divider />
      <Stack
        sx={{ p: 3, bgcolor: 'background.neutral' }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {requestMode ? (
          <Button
            LinkComponent={Link}
            href={paths.dashboard.opportunity.edit(opportunityData.ID)}
            fullWidth
            variant="contained"
            color="primary"
          >
            Fulfill
          </Button>
        ) : (
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width={1}
          >
            {opportunityData.documents.length ? (
              <DownloadButton
                opportunity={opportunityData}
                isOwner={opportunityOwnedIDs?.includes(opportunityData.ID)}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                No documents
              </Typography>
            )}

            {opportunityData.description && (
              <DescriptionPopup description={opportunityData.description} />
            )}
          </Stack>
        )}
      </Stack>
    </RootStyle>
  );
}
