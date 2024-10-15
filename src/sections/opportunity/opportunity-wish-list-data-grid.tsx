import { LoadingButton } from '@mui/lab';
import { Card, IconButton, InputAdornment, Menu, MenuItem, Stack, TextField } from '@mui/material';
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
import { useSnackbar } from 'notistack';
import React, { useCallback, useMemo, useState } from 'react';
import { WishListQueryFiltersType } from 'src/@types/opportunity/wish-list/queryWishListData';
import { WishListData } from 'src/@types/opportunity/wish-list/wishListData';
import { useDeleteWishListMutation } from 'src/_req-hooks/opportunity/wishList/useDeleteWishListMutation';
import { useWishListQuery } from 'src/_req-hooks/opportunity/wishList/useWishListQuery';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { format } from 'date-fns';

// ---------------------------------------------------------------------------------
type ActionsMenuProps = {
  wishList?: WishListData | undefined;
  reloadWishList: () => void;
};

function ActionsMenu({ wishList, reloadWishList }: ActionsMenuProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const openActionMenu = Boolean(menuAnchor);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const { mutateAsync: deleteWishList, isLoading } = useDeleteWishListMutation();

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  const handleDeleteWishList = useCallback(async () => {
    closeMenu();
    if (!wishList) return;
    try {
      await deleteWishList({ ids: wishList.ID.toString() });
      reloadWishList();
      enqueueSnackbar('Wishlist deleted successfully', {
        variant: 'success',
      });
      closeDeleteDialog();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.data, { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishList, deleteWishList]);

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
        <MenuItem onClick={openDeleteDialog}>
          <Iconify icon="bxs:trash" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Opportunity"
        onClose={closeDeleteDialog}
        content={
          <>
            Are you sure want to delete <strong> {wishList?.opportunity?.title} </strong>{' '}
            opportunity?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isLoading}
            onClick={handleDeleteWishList}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}

//---------------------------------------------------------------------------------

export default function OpportunityWishListDataGrid() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(
    Number(localStorage.getItem('wishlist-pageSize')) || 8
  );
  const [wishListFilters, setWishListFilters] = useState<WishListQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });
  const [searchValue, setSearchValue] = useState('');

  const { order, order_by } = sort;
  const { data, isLoading, refetch } = useWishListQuery({
    page: page + 1,
    order,
    order_by,
    per_page: pageSize,
    filters: wishListFilters,
  });

  const rows = data?.data?.items || [];
  const totalRows = data?.data?.totalRows || 0;

  const handlePageChange = (params: GridPaginationModel) => {
    localStorage.setItem('wishlist-pageSize', params.pageSize.toString());
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
    console.log(model);
    const newOpportunityFilters = model.items.reduce(
      (acc: WishListQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setWishListFilters(newOpportunityFilters);
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'ID', headerName: '#', width: 50, filterable: false },
      {
        field: 'Action',
        headerName: '',
        align: 'right',
        width: 40,
        sortable: false,
        filterable: false,
        renderCell: (params: GridRenderCellParams<WishListData>) => (
          <ActionsMenu wishList={params.row} reloadWishList={refetch} />
        ),
      },
      {
        field: 'solicitation_number',
        headerName: 'Solicitation Number',
        flex: 1,
        renderCell: (params: GridRenderCellParams<any>) => params.row?.solicitation_number,
      },
      // {
      //   field: 'Document',
      //   headerName: 'Document',
      //   align: 'center',
      //   sortable: false,
      //   filterable: false,
      //   renderCell: (params: GridRenderCellParams<WishListData>) => (
      //     <DownloadButton opportunity={params.row.opportunity} />
      //   ),
      // },
      {
        field: 'title',
        headerName: 'Title',
        flex: 1,
        renderCell: (params: GridRenderCellParams<any>) => params.row.opportunity?.title,
      },

      {
        field: 'department',
        headerName: 'Department',
        flex: 1,
        renderCell: (params: GridRenderCellParams<any>) => params.row.opportunity?.department,
      },
      {
        field: 'office',
        headerName: 'Office',
        flex: 1,
        renderCell: (params: GridRenderCellParams<any>) => params.row.opportunity?.office,
      },
      {
        field: 'agency',
        headerName: 'Agency',
        flex: 1,
        renderCell: (params: GridRenderCellParams<any>) => params.row.opportunity?.agency,
      },
      {
        field: 'created_at',
        headerName: 'Created At',
        flex: 1,
        type: 'dateTime',
        renderCell: (params: GridRenderCellParams<any>) =>
          format(new Date(params.row.created_at), 'MMM dd, yyyy'),
        valueGetter: (params: GridValueGetterParams<any>) => new Date(params.row?.created_at),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
    setWishListFilters({
      opportunity_id: { op: 'contains', value: e.target.value },
    });
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
        sx={{ height: 55 * pageSize + 160 }}
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
