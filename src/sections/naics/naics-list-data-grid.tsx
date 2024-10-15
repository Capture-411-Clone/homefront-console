import { LoadingButton } from '@mui/lab';
import { Card, IconButton, Menu, MenuItem } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFilterItem,
  GridFilterModel,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'notistack';
import React, { useCallback, useMemo, useState } from 'react';
import { NaicsData } from 'src/@types/opportunity/naics/naicsData';
import { NaicsQueryFiltersType } from 'src/@types/opportunity/naics/queryNaicsData';
import { useDeleteNaicsMutation } from 'src/_req-hooks/opportunity/naics/useDeleteNaicsMutation';
import { useNaicsQuery } from 'src/_req-hooks/opportunity/naics/useGetNaicsQuery';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';

//---------------------------------------------------------------------------------
type ActionsMenuProps = {
  NAICS?: NaicsData | undefined;
  reloadNaics: () => void;
};

function ActionsMenu({ NAICS, reloadNaics }: ActionsMenuProps) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const openActionMenu = Boolean(menuAnchor);
  const router = useRouter();

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const handleEditNaics = useCallback(() => {
    closeMenu();
    if (!NAICS) return;
    router.push(paths.dashboard.Naics.edit(NAICS.ID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NAICS]);

  const { mutateAsync: deleteNaics, isLoading } = useDeleteNaicsMutation();

  const handleDeleteNaics = useCallback(async () => {
    if (!NAICS) return;
    try {
      await deleteNaics({ ids: NAICS.ID.toString() });
      reloadNaics();
      enqueueSnackbar('NAICS deleted successfully', {
        variant: 'success',
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.data, { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NAICS, deleteNaics]);

  const openDeleteDialog = useCallback(() => {
    closeMenu();
    setDeleteDialogOpen(true);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

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
        <MenuItem onClick={handleEditNaics}>
          <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={openDeleteDialog}>
          <Iconify icon="bxs:trash" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Address"
        onClose={closeDeleteDialog}
        content={
          <>
            Are you sure want to delete <strong> {NAICS?.name} </strong> address?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isLoading}
            onClick={handleDeleteNaics}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
//---------------------------------------------------------------------------------

export default function NaicsDataGrid() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(
    Number(localStorage.getItem('naics-pageSize')) || 8
  );
  const [categoryFilters, setCategoryFilters] = useState<NaicsQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });

  const { order, order_by } = sort;
  const { data, isLoading, refetch } = useNaicsQuery({
    page: page + 1,
    order,
    order_by,
    per_page: pageSize,
    filters: categoryFilters,
  });

  const rows = data?.data.items || [];
  const totalRows = data?.data.totalRows || 0;

  const handlePageChange = (params: GridPaginationModel) => {
    localStorage.setItem('naics-pageSize', params.pageSize.toString());
    setPage(params.page);
    setPageSize(params.pageSize);
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'ID', headerName: '#', width: 90, filterable: false },
      { field: 'name', headerName: 'Name', flex: 1 },
      {
        field: 'Action',
        headerName: '',
        align: 'right',
        width: 40,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<any>) => (
          <ActionsMenu NAICS={params.row} reloadNaics={refetch} />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSorts = (model: GridSortModel) => {
    setSort({
      order: model?.[0]?.sort || '',
      order_by: model?.[0]?.field || '',
    });
  };

  const handleFilter = (model: GridFilterModel) => {
    console.log(model);
    const newNaicsFilters = model.items.reduce(
      (acc: NaicsQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setCategoryFilters(newNaicsFilters);
  };

  return (
    <Card>
      <DataGrid
        loading={isLoading}
        pagination
        paginationMode="server"
        pageSizeOptions={[8, 50, 100]}
        paginationModel={{ page, pageSize }}
        columns={columns}
        sx={{ height: 55 * pageSize + 160 }}
        rows={rows}
        getRowId={(row) => row.ID}
        rowCount={totalRows}
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
