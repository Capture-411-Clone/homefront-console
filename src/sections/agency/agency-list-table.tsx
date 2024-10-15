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
import { useCallback, useMemo, useState } from 'react';
import { AgencyData } from 'src/@types/opportunity/agency/agencyData';
import { AgenciesQueryFiltersType } from 'src/@types/opportunity/agency/queryAgenciesData';
import { useAgenciesQuery } from 'src/_req-hooks/opportunity/agency/useAgenciesQuery';
import { useDeleteAgencyMutation } from 'src/_req-hooks/opportunity/agency/useDeleteAgencyMutation';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';

//---------------------------------------------------------------------------------
type ActionsMenuProps = {
  agency?: AgencyData | undefined;
  reloadAgency: () => void;
};

function ActionsMenu({ agency, reloadAgency }: ActionsMenuProps) {
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

  const handleEditAgency = useCallback(() => {
    closeMenu();
    if (!agency) return;
    router.push(paths.dashboard.agency.edit(agency.ID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agency]);

  const { mutateAsync: deleteAgency, isLoading } = useDeleteAgencyMutation();

  const handleDeleteAgency = useCallback(async () => {
    if (!agency) return;
    try {
      await deleteAgency({ ids: agency.ID.toString() });
      reloadAgency();
      enqueueSnackbar('Agency deleted successfully', {
        variant: 'success',
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.data, { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agency, deleteAgency]);

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
        <MenuItem onClick={handleEditAgency}>
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
            Are you sure want to delete <strong> {agency?.name} </strong> Agency?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isLoading}
            onClick={handleDeleteAgency}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
//---------------------------------------------------------------------------------

export default function AgencyListTable() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(
    Number(localStorage.getItem('agency-pageSize')) || 8
  );
  const [agencyFilters, setAgencyFilters] = useState<AgenciesQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });

  const { order, order_by } = sort;

  const { data, isLoading, refetch } = useAgenciesQuery({
    page: page + 1,
    order,
    order_by,
    per_page: pageSize,
    filters: agencyFilters,
  });

  const rows = data?.data.items || [];
  const totalRows = data?.data.totalRows || 0;

  const handlePageChange = (params: GridPaginationModel) => {
    localStorage.setItem('agency-pageSize', params.pageSize.toString());
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
    const newAgencyFilters = model.items.reduce(
      (acc: AgenciesQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setAgencyFilters(newAgencyFilters);
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'ID', headerName: 'ID', width: 90 },
      { field: 'name', headerName: 'Name', width: 500 },
      {
        field: 'acronym',
        headerName: 'Acronym',
        align: 'left',
        flex: 1,
      },
      {
        field: 'Action',
        headerName: '',
        align: 'right',
        width: 40,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<any>) => (
          <ActionsMenu agency={params.row} reloadAgency={refetch} />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
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
        rows={rows}
        rowCount={totalRows}
        getRowId={(row: AgencyData) => row.ID}
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
