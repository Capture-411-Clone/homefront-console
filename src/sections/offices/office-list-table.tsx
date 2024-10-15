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
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo, useState } from 'react';
import { OfficeData } from 'src/@types/opportunity/office/officeData';
import { OfficesQueryFiltersType } from 'src/@types/opportunity/office/queryOfficesData';
import { useDeleteOfficesMutation } from 'src/_req-hooks/opportunity/office/useDeleteOfficeMutation';
import { useOfficesQuery } from 'src/_req-hooks/opportunity/office/useGetAllofficesQuery';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
//---------------------------------------------------------------------------------
type ActionsMenuProps = {
  office?: OfficeData | undefined;
  reloadOffice: () => void;
};

function ActionsMenu({ office, reloadOffice }: ActionsMenuProps) {
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

  const handleEditOffice = useCallback(() => {
    closeMenu();
    if (!office) return;
    router.push(paths.dashboard.offices.edit(office.ID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [office]);

  const { mutateAsync: deleteOffice, isLoading } = useDeleteOfficesMutation();

  const handleDeleteOffice = useCallback(async () => {
    if (!office) return;
    try {
      await deleteOffice({ ids: office.ID.toString() });
      reloadOffice();
      enqueueSnackbar('Office deleted successfully', {
        variant: 'success',
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.data, { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [office, deleteOffice]);

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
        <MenuItem onClick={handleEditOffice}>
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
            Are you sure want to delete <strong> {office?.name} </strong> Office?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isLoading}
            onClick={handleDeleteOffice}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
//---------------------------------------------------------------------------------

export default function OfficeListTable() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(
    Number(localStorage.getItem('office-pageSize')) || 8
  );
  const [officeFilters, setOfficeFilters] = useState<OfficesQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });

  const { order, order_by } = sort;

  const { data, isLoading, refetch } = useOfficesQuery({
    page: page + 1,
    order,
    order_by,
    per_page: pageSize,
    filters: officeFilters,
  });

  const rows = data?.data.items || [];
  const totalRows = data?.data.totalRows || 0;

  const handlePageChange = (params: GridPaginationModel) => {
    localStorage.setItem('office-pageSize', params.pageSize.toString());
    setPage(params.page);
    setPageSize(params.pageSize);
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'ID', headerName: 'ID', width: 90, filterable: false },
      { field: 'name', headerName: 'Name', width: 200, flex: 1 },
      { field: 'acronym', headerName: 'Acronym', width: 200, flex: 1 },
      {
        field: 'Action',
        headerName: '',
        align: 'right',
        width: 40,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<any>) => (
          <ActionsMenu office={params.row} reloadOffice={refetch} />
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
    const newOfficeFilters = model.items.reduce(
      (acc: OfficesQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setOfficeFilters(newOfficeFilters);
  };

  return (
    <Card>
      <DataGrid
        loading={isLoading}
        pagination
        sx={{ height: 55 * pageSize + 160 }}
        paginationMode="server"
        pageSizeOptions={[8, 50, 100]}
        paginationModel={{ page, pageSize }}
        columns={columns}
        rows={rows as OfficeData[]}
        rowCount={totalRows}
        disableRowSelectionOnClick
        getRowId={(row: OfficeData) => row.ID}
        // checkboxSelection
        sortingMode="server"
        onSortModelChange={handleSorts}
        filterMode="server"
        onFilterModelChange={handleFilter}
        slots={{ toolbar: GridToolbar }}
        onPaginationModelChange={handlePageChange}
        slotProps={{
          filterPanel: { sx: { width: { xs: '250px', md: 'auto' } } },
        }}
      />
    </Card>
  );
}
