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
import { FiscalYearData } from 'src/@types/opportunity/fiscal-year/fiscalYearData';
import { FiscalYearsQueryFiltersType } from 'src/@types/opportunity/fiscal-year/queryFiscalYearData';
import { useDeleteFiscalYearMutation } from 'src/_req-hooks/opportunity/fiscal-year/useDeleteFiscalYearMutation';
import { useFiscalYearQuery } from 'src/_req-hooks/opportunity/fiscal-year/useFiscalYearQuery';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';

//---------------------------------------------------------------------------------
type ActionsMenuProps = {
  fiscalYear?: FiscalYearData | undefined;
  reloadFiscalYear: () => void;
};

function ActionsMenu({ fiscalYear, reloadFiscalYear }: ActionsMenuProps) {
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

  const handleEditFiscalYear = useCallback(() => {
    closeMenu();
    if (!fiscalYear) return;
    router.push(paths.dashboard.fiscal_year.edit(fiscalYear.ID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fiscalYear]);

  const { mutateAsync: deleteFiscalYear, isLoading } = useDeleteFiscalYearMutation();

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  const handleDeleteFiscalYear = useCallback(async () => {
    if (!fiscalYear) return;
    try {
      await deleteFiscalYear({ ids: fiscalYear.ID.toString() });
      reloadFiscalYear();
      closeDeleteDialog();
      enqueueSnackbar('Year deleted successfully', {
        variant: 'success',
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Deleting fiscal year faild', { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fiscalYear, deleteFiscalYear]);

  const openDeleteDialog = useCallback(() => {
    closeMenu();
    setDeleteDialogOpen(true);
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
        <MenuItem onClick={handleEditFiscalYear}>
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
            Are you sure want to delete <strong> {fiscalYear?.year} </strong> address?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isLoading}
            onClick={handleDeleteFiscalYear}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
//---------------------------------------------------------------------------------

export default function FiscalListDataGrid() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(
    Number(localStorage.getItem('fiscal-pageSize')) || 8
  );
  const [fiscalYearFilters, setFiscalYearFilters] = useState<FiscalYearsQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });

  const { order, order_by } = sort;
  const { data, isLoading, refetch } = useFiscalYearQuery({
    page: page + 1,
    order,
    order_by,
    per_page: pageSize,
    filters: fiscalYearFilters,
  });

  const rows = data?.data?.items || [];
  const totalRows = data?.data?.totalRows || 0;

  const handlePageChange = (params: GridPaginationModel) => {
    localStorage.setItem('fiscal-pageSize', params.pageSize.toString());
    setPage(params.page);
    setPageSize(params.pageSize);
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'ID', headerName: '#', width: 90, filterable: false },
      { field: 'Year', headerName: 'Year', flex: 1 },
      {
        field: 'Action',
        headerName: '',
        align: 'right',
        width: 40,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<FiscalYearData>) => (
          <ActionsMenu fiscalYear={params.row} reloadFiscalYear={refetch} />
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
    const newFiscalYearFilters = model.items.reduce(
      (acc: FiscalYearsQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setFiscalYearFilters(newFiscalYearFilters);
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
