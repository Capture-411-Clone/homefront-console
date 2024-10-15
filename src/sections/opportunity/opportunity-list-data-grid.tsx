import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFilterItem,
  GridFilterModel,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { OpportunityData } from 'src/@types/opportunity/opportunity/opportunityData';
import { OpportunitiesQueryFiltersType } from 'src/@types/opportunity/opportunity/queryOpportunityData';
import { useDeleteOpportunityMutation } from 'src/_req-hooks/opportunity/opportunity/useDeleteOpportunityMutation';
import { useOpportunityQuery } from 'src/_req-hooks/opportunity/opportunity/useOpportunityQuery';
import { useCreateWishListMutation } from 'src/_req-hooks/opportunity/wishList/useCreateWhishListMutation';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
//
import { useAuthContext } from 'src/auth/hooks';
import { useWishListQuery } from 'src/_req-hooks/opportunity/wishList/useWishListQuery';
import { useDeleteWishListMutation } from 'src/_req-hooks/opportunity/wishList/useDeleteWishListMutation';
import { fNumber } from 'src/utils/format-number';
import ReactTimeAgo from 'react-time-ago';
import { useGetAllOpportunityOwnedIDsQuery } from 'src/_req-hooks/opportunity/order/useGetAllOpportunityOwnedIDsQuery';
import DownloadButton from './opportunity-menues/download-button';
// ---------------------------------------------------------------------------------
type ActionsMenuProps = {
  opportunity?: OpportunityData | undefined;
  reloadOpportunity: () => void;
  noEdit?: boolean;
  noDelete?: boolean;
};

function ActionsMenu({ opportunity, reloadOpportunity, noEdit, noDelete }: ActionsMenuProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const [wished, setWished] = useState<boolean>(false);

  const router = useRouter();
  const openActionMenu = Boolean(menuAnchor);

  const { data: wishData, refetch: refetchWishList } = useWishListQuery({});

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    const dataCheck = !!wishData?.data.items.find((i) => i.opportunity_id === opportunity?.ID);
    setWished(dataCheck);

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

  const handleToggleWishList = useCallback(async () => {
    closeMenu();
    if (!opportunity) return;
    try {
      if (!wishData?.data.items.find((i) => i.opportunity_id === opportunity?.ID)) {
        await AddWishList({
          opportunity_id: opportunity.ID,
        });
        refetchWishList();
        enqueueSnackbar('Opportunity Add to wish list successfully', {
          variant: 'success',
        });
      } else {
        await RemoveWish({
          ids:
            wishData?.data.items
              .find((wish) => wish.opportunity_id === opportunity?.ID)
              ?.ID.toString() || '',
        });
        refetchWishList();
        enqueueSnackbar('Opportunity Removed from wish list successfully', {
          variant: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar('There is an error while doing this action.', { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunity, wishData?.data?.items]);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  const handleDeleteOpportunity = useCallback(async () => {
    closeMenu();
    if (!opportunity) return;
    try {
      await deleteOpportunity({ ids: opportunity.ID.toString() });
      enqueueSnackbar('Opportunity deleted successfully', {
        variant: 'success',
      });
      reloadOpportunity();
      closeDeleteDialog();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.data, { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunity, deleteOpportunity]);

  return (
    <>
      <IconButton onClick={openMenu}>
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
        <MenuItem onClick={handleToggleWishList}>
          <Iconify icon={wished ? 'mdi:heart' : 'mdi:heart-outline'} sx={{ mr: 1 }} />
          {wished ? 'Wish List' : 'Wish List'}
        </MenuItem>
        {!noEdit && (
          <MenuItem onClick={handleEditOpportunity}>
            <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
        )}
        {!noDelete && (
          <MenuItem onClick={openDeleteDialog}>
            <Iconify icon="bxs:trash" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        )}
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

//---------------------------------------------------------------------------------

type OpportunityListDataGridProps = {
  requestMode?: boolean;
  onlyOwner?: boolean;
  myPipeline?: boolean;
};

export default function OpportunityListDataGrid(props: OpportunityListDataGridProps) {
  const { requestMode, onlyOwner, myPipeline } = props;
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(
    Number(localStorage.getItem('opportunity-pageSize')) || 8
  );
  const [opportunityFilters, setOpportunityFilters] = useState<OpportunitiesQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });
  const [searchValue, setSearchValue] = useState<string>('');

  const { order, order_by } = sort;

  const onlyRequestedFilter = useMemo(
    () =>
      ({
        requested: { op: 'is', value: requestMode ? 'true' : 'false' },
      }) as OpportunitiesQueryFiltersType,
    [requestMode]
  );

  const { data, isLoading, refetch } = useOpportunityQuery({
    page: page + 1,
    order,
    order_by,
    query: searchValue,
    per_page: pageSize,
    mine_only: onlyOwner ? 'true' : 'false',
    my_pipeline: myPipeline ? 'true' : 'false',
    filters: { ...opportunityFilters, ...onlyRequestedFilter },
  });

  const rows = data?.data?.items || [];
  const totalRows = data?.data?.totalRows || 0;

  const { data: ownedData, isLoading: getOwnedLoading } = useGetAllOpportunityOwnedIDsQuery();
  const opportunityOwnedIDs = ownedData?.data;

  const handlePageChange = (params: GridPaginationModel) => {
    localStorage.setItem('opportunity-pageSize', params.pageSize.toString());
    setPage(params.page);
    setPageSize(params.pageSize);
  };

  const handleSorts = (model: GridSortModel) => {
    setSort({
      order: model?.[0]?.sort || '',
      order_by: model?.[0]?.field || '',
    });
  };

  const handleFilter = (model: GridFilterModel) => {
    const newOpportunityFilters = model.items.reduce(
      (acc: OpportunitiesQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setOpportunityFilters(newOpportunityFilters);
  };

  useEffect(() => () => {
    refetch();
  });

  const { user } = useAuthContext();
  const userRoles = user?.roles;

  const columns = useMemo<GridColDef[]>(
    () => {
      let cols = [
        { field: 'ID', headerName: '#', width: 50, filterable: false },
        {
          field: 'Action',
          headerName: '',
          align: 'right',
          width: 40,
          sortable: false,
          filterable: false,
          renderCell: (params: GridRenderCellParams<OpportunityData>) => (
            <ActionsMenu
              opportunity={params.row}
              reloadOpportunity={refetch}
              noDelete={!isAdmin || !isReviewer}
            />
          ),
        },
        {
          field: 'solicitation_number',
          headerName: 'Solicitation Number',
          flex: 1,
          minWidth: 180,
          type: 'string',
          renderCell: (params: GridRenderCellParams<OpportunityData>) => (
            <Box
              component={Tooltip}
              title={params.row?.solicitation_number}
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {params.row?.solicitation_number || 'N/A'}
            </Box>
          ),
        },
        {
          field: 'document_id',
          headerName: 'Document',
          align: 'center',
          minWidth: 50,
          sortable: false,
          filterable: false,
          type: 'string',
          renderCell: (params: GridRenderCellParams<OpportunityData>) =>
            params.row.documents.length ? (
              <DownloadButton
                opportunity={params.row}
                isLoading={getOwnedLoading}
                isOwner={opportunityOwnedIDs?.includes(params.row.ID)}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                No documents
              </Typography>
            ),
        },
        {
          field: 'approved_at',
          headerName: 'Approved',
          type: 'boolean',
          minWidth: 100,
          flex: 1,
          renderCell: (params: GridRenderCellParams<OpportunityData>) =>
            params.row?.approved_at ? 'Yes' : 'No',
        },
        {
          field: 'crawler_contract_value',
          headerName: 'Contract Value',
          type: 'string',
          minWidth: 150,
          flex: 1,
          renderCell: (params: GridRenderCellParams<OpportunityData>) =>
            `${params?.row.crawler_contract_value || params?.row.user_contract_value ? '$' : ''}${fNumber(
              params?.row.crawler_contract_value || params?.row.user_contract_value
            )}`,
        },
        {
          field: 'duplicated',
          headerName: 'Duplicated',
          minWidth: 100,
          type: 'boolean',
          flex: 1,
          renderCell: (params: GridRenderCellParams<OpportunityData>) =>
            params.row?.duplicated ? 'Yes' : 'No',
        },
        {
          field: 'deprecated',
          headerName: 'Depricated',
          minWidth: 100,
          type: 'boolean',
          flex: 1,
          renderCell: (params: GridRenderCellParams<OpportunityData>) =>
            params.row?.deprecated ? 'Yes' : 'No',
        },
        {
          field: 'title',
          type: 'string',
          headerName: 'Title',
          flex: 1,
          minWidth: 200,

          renderCell: (params: GridRenderCellParams<OpportunityData>) => (
            <Box
              component={Tooltip}
              title={params.row?.title}
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {params.row?.title || 'N/A'}
            </Box>
          ),
        },
        {
          field: 'department_id',
          headerName: 'Department',
          type: 'string',
          minWidth: 150,
          flex: 1,
          renderCell: (params: GridRenderCellParams<OpportunityData>) => (
            <Box
              component={Tooltip}
              title={params.row?.department}
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {params.row?.department || 'N/A'}
            </Box>
          ),
        },
        {
          field: 'agency_id',
          headerName: 'Agency',
          minWidth: 150,
          flex: 1,
          type: 'string',
          renderCell: (params: GridRenderCellParams<OpportunityData>) => (
            <Box
              component={Tooltip}
              title={params.row?.agency}
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {params.row?.agency || 'N/A'}
            </Box>
          ),
        },
        {
          field: 'office_id',
          headerName: 'Office',
          minWidth: 150,
          flex: 1,
          type: 'string',
          renderCell: (params: GridRenderCellParams<OpportunityData>) => (
            <Box
              component={Tooltip}
              title={params.row?.office}
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {params.row?.office || 'N/A'}
            </Box>
          ),
        },
        {
          field: 'naics_id',
          headerName: 'NAICS',
          minWidth: 150,
          flex: 1,
          type: 'string',
          renderCell: (params: GridRenderCellParams<OpportunityData>) => (
            <Box
              component={Tooltip}
              title={params.row?.naics}
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {params.row?.naics || 'N/A'}
            </Box>
          ),
        },
        {
          field: 'contract_vehicle_id',
          headerName: 'Contract Vehicle',
          minWidth: 150,
          flex: 1,
          type: 'string',
          renderCell: (params: GridRenderCellParams<OpportunityData>) => (
            <Box
              component={Tooltip}
              title={params.row?.contract_vehicle}
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {params.row?.contract_vehicle || 'N/A'}
            </Box>
          ),
        },
        {
          field: 'set_aside_id',
          headerName: 'Set Aside',
          minWidth: 150,
          flex: 1,
          type: 'string',
          renderCell: (params: GridRenderCellParams<OpportunityData>) => (
            <Box
              component={Tooltip}
              title={params.row?.set_aside}
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {params.row?.set_aside || 'N/A'}
            </Box>
          ),
        },
        {
          field: 'fiscal_year_id',
          headerName: 'Year Issued',
          minWidth: 100,
          flex: 1,
          type: 'string',
          renderCell: (params: GridRenderCellParams<OpportunityData>) =>
            params.row?.fiscal_year || 'N/A',
        },
        {
          field: 'staff_id',
          headerName: 'Staff',
          minWidth: 250,
          flex: 1,
          type: 'string',
          renderCell: (params: GridRenderCellParams<OpportunityData>) => (
            <Box
              component={Tooltip}
              title={params.row?.staff?.email}
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {params.row?.staff?.email || 'N/A'}
            </Box>
          ),
        },
        {
          field: 'user_id',
          headerName: 'Contributor',
          minWidth: 250,
          flex: 1,
          type: 'string',
          renderCell: (params: GridRenderCellParams<OpportunityData>) => (
            <Box
              component={Tooltip}
              title={params.row?.user?.email}
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {params.row?.user?.email || 'N/A'}
            </Box>
          ),
        },
        {
          field: 'created_at',
          headerName: 'Created',
          minWidth: 150,
          flex: 1,
          type: 'dateTime',
          renderCell: (params: GridRenderCellParams<OpportunityData>) => (
            <ReactTimeAgo date={params.row.created_at} />
          ),

          valueGetter: (params: GridValueGetterParams<OpportunityData>) =>
            new Date(params.row?.created_at),
        },
      ];
      const isAdmin = !!userRoles?.find((role) => role.title === 'Admin');
      const isReviewer = !!userRoles?.find((role) => role.title === 'Reviewer');

      if (
        !isAdmin &&
        (user?.email === 'christina.mee@gmail.com')
      ) {
        cols = cols.filter((col) => col.field !== 'approved_at');
        cols = cols.filter((col) => col.field !== 'user_id');
      }
      return cols as GridColDef[];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userRoles, opportunityOwnedIDs]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Card>
      <Stack alignItems="center" justifyContent="center" p={2}>
        <TextField
          placeholder="Search..."
          fullWidth
          value={searchValue}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <DataGrid
        loading={isLoading}
        sx={{ width: '100%', minWidth: 800, height: 55 * pageSize + 160 }}
        pagination
        paginationMode="server"
        pageSizeOptions={[8, 50, 100]}
        paginationModel={{ page, pageSize }}
        columns={columns}
        rows={rows}
        getRowId={(row) => row.ID}
        rowCount={totalRows}
        // checkboxSelection
        sortingMode="server"
        onSortModelChange={handleSorts}
        filterMode="server"
        onFilterModelChange={handleFilter}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        onPaginationModelChange={handlePageChange}
        slotProps={{
          filterPanel: { sx: { width: { xs: '250px', md: 'auto' } } },
        }}
      />
    </Card>
  );
}
