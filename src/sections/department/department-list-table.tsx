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
import { DepartmentData } from 'src/@types/opportunity/department/departmentData';
import { DepartmentsQueryFiltersType } from 'src/@types/opportunity/department/queryDepartmentsData';
import { useDeleteDepartmentMutation } from 'src/_req-hooks/opportunity/depatments/useDeleteDepartmentMutation';
import { useDepartmentsQuery } from 'src/_req-hooks/opportunity/depatments/useDepartmentsQuery';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';

//---------------------------------------------------------------------------------
type ActionsMenuProps = {
  department?: DepartmentData | undefined;
  reloadDepartment: () => void;
};

function ActionsMenu({ department, reloadDepartment }: ActionsMenuProps) {
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

  const handleEditCategory = useCallback(() => {
    closeMenu();
    if (!department) return;
    router.push(paths.dashboard.department.edit(department.ID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department]);

  const { mutateAsync: deleteCategory, isLoading } = useDeleteDepartmentMutation();

  const handleDeleteCategory = useCallback(async () => {
    if (!department) return;
    try {
      await deleteCategory({ ids: department.ID.toString() });
      reloadDepartment();
      enqueueSnackbar('Category deleted successfully', {
        variant: 'success',
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.data, { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department, deleteCategory]);

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
        <MenuItem onClick={handleEditCategory}>
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
        title="Delete Department"
        onClose={closeDeleteDialog}
        content={
          <>
            Are you sure want to delete <strong> {department?.name} </strong> Department?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isLoading}
            onClick={handleDeleteCategory}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
//---------------------------------------------------------------------------------

export default function DepartmentListTable() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(
    Number(localStorage.getItem('department-pageSize')) || 8
  );

  const [departmentFilters, setDepartmentFilters] = useState<DepartmentsQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });

  const { order, order_by } = sort;

  const { data, isLoading, refetch } = useDepartmentsQuery({
    page: page + 1,
    order,
    order_by,
    per_page: pageSize,
    filters: departmentFilters,
  });

  const rows = data?.data.items || [];
  const totalRows = data?.data.totalRows || 0;

  const handlePageChange = (params: GridPaginationModel) => {
    localStorage.setItem('department-pageSize', params.pageSize.toString());
    setPage(params.page);
    setPageSize(params.pageSize);
  };

  const handleSorts = (model: GridSortModel) => {
    setSort({
      order: model?.[0]?.sort || '',
      order_by: model?.[0]?.field || '',
    });
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'ID', headerName: 'ID', width: 90 },
      { field: 'name', headerName: 'Name', width: 400, flex: 1 },
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
          <ActionsMenu department={params.row} reloadDepartment={refetch} />
        ),
      },
      // {
      //   field: 'market',
      //   headerName: 'Market',
      //   align: 'left',
      //   valueGetter: (params: GridValueGetterParams) =>
      //     params.row.market?.name || '_',
      //   flex: 1,
      // },
      // {
      //   field: 'agencies',
      //   headerName: 'Agencies',
      //   align: 'left',
      //   valueGetter: (params: GridValueGetterParams) =>
      //     params.row.agencies?.length || 0,
      //   flex: 1,
      // },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleFilter = (model: GridFilterModel) => {
    const newDepartmentFilters = model.items.reduce(
      (acc: DepartmentsQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setDepartmentFilters(newDepartmentFilters);
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
        rows={rows}
        rowCount={totalRows}
        getRowId={(row: DepartmentData) => row.ID}
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
