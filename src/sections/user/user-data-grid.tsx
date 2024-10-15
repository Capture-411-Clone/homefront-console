import { Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
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
import { useCallback, useMemo, useState } from 'react';
import { UserData } from 'src/@types/opportunity/user/userData';
import { useUsersQuery } from 'src/_req-hooks/opportunity/user/useUsersQuery';
import { format } from 'date-fns';
import { UsersQueryFiltersType } from 'src/@types/opportunity/user/queryUsersData';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useDeleteUsersMutation } from 'src/_req-hooks/opportunity/user/useDeleteUsersMutation';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { LoadingButton } from '@mui/lab';
import { useAuthContext } from 'src/auth/hooks';

//---------------------------------------------------------------------------------
type ActionsMenuProps = {
  user?: UserData | undefined;
  reloadUsers: () => void;
};

function ActionsMenu({ user, reloadUsers }: ActionsMenuProps) {
  const { user: adminUser } = useAuthContext();

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
    if (!user) return;
    router.push(paths.dashboard.user.edit(user.ID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const { mutateAsync: deleteUser, isLoading } = useDeleteUsersMutation();

  const handleDeleteCategory = useCallback(async () => {
    if (!user) return;
    try {
      await deleteUser({ ids: user.ID.toString() });
      reloadUsers();
      enqueueSnackbar('User deleted successfully', {
        variant: 'success',
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.data, { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, deleteUser]);

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
        {adminUser?.email === 'christina.mee@gmail.com' && (
          <MenuItem onClick={openDeleteDialog}>
            <Iconify icon="bxs:trash" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        )}
      </Menu>
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Address"
        onClose={closeDeleteDialog}
        content={
          <>
            Are you sure want to delete <strong> {user?.name} </strong> User?
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

export default function UserDataGrid() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(
    Number(localStorage.getItem('user-pageSize')) || 8
  );
  const [userFilters, setUserFilters] = useState<UsersQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });

  const { order, order_by } = sort;
  const { data, isLoading, refetch } = useUsersQuery({
    page: page + 1,
    order,
    order_by,
    per_page: pageSize,
    filters: userFilters,
  });

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'ID', headerName: '#', width: 50, filterable: false },
      {
        field: 'name',
        width: 200,
        headerName: 'Name',
        renderCell: (params: GridRenderCellParams<UserData>) => params.row?.name,
      },
      {
        field: 'last_name',
        width: 200,
        headerName: 'Last Name',
        renderCell: (params: GridRenderCellParams<UserData>) => params.row?.last_name,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 300,
        renderCell: (params: GridRenderCellParams<UserData>) => (
          <Typography color={params.row?.email_verified_at ? 'text.primary' : 'error'}>
            {params.row?.email}
          </Typography>
        ),
      },
      {
        field: 'phone',
        width: 150,
        headerName: 'Phone',
        renderCell: (params: GridRenderCellParams<UserData>) => (
          <Typography color="text.primary">{params.row?.phone}</Typography>
        ),
      },
      {
        field: 'referral_code',
        width: 150,
        headerName: 'Referral Code',
        renderCell: (params: GridRenderCellParams<UserData>) => params.row?.referral_code,
      },
      {
        field: 'referred_with_code',
        width: 150,
        headerName: 'Referred With',
        renderCell: (params: GridRenderCellParams<UserData>) => params.row?.referred_with_code,
      },
      {
        field: 'role_id',
        width: 100,
        headerName: 'Role(s)',
        type: 'singleSelect',
        filterable: false,
        sortable: false,
        valueOptions: [
          { value: '1', label: 'Admin' },
          { value: '2', label: 'Reviewer' },
          { value: '3', label: 'User' },
        ],
        renderCell: (params: GridRenderCellParams<UserData>) =>
          params.row?.roles.reduce(
            (acc, role, i) => `${acc + role.title}${i < params.row.roles.length - 1 ? ', ' : ''}`,
            ''
          ),
      },
      {
        field: 'suspended_at',
        headerName: 'Suspension Status',
        width: 150,
        type: 'boolean',
        renderCell: (params: GridRenderCellParams<UserData>) =>
          params.row?.suspended_at ? <Typography color="error">Suspended</Typography> : 'Normal',
      },
      {
        field: 'created_at',
        width: 150,
        headerName: 'Created At',
        type: 'dateTime',
        renderCell: (params: GridRenderCellParams<UserData>) =>
          format(new Date(params.row.created_at), 'MMM dd, yyyy'),
        valueGetter: (params: GridValueGetterParams<UserData>) => new Date(params.row?.created_at),
      },
      {
        field: 'Action',
        headerName: '',
        align: 'right',
        width: 40,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<UserData>) => (
          <ActionsMenu user={params.row} reloadUsers={refetch} />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const rows = data?.data.items || [];
  const totalRows = data?.data.totalRows || 0;

  const handlePageChange = (params: GridPaginationModel) => {
    localStorage.setItem('user-pageSize', params.pageSize.toString());
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
    const newUserFilters = model.items.reduce(
      (acc: UsersQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setUserFilters(newUserFilters);
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
        getRowId={(row: UserData) => row.ID}
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
