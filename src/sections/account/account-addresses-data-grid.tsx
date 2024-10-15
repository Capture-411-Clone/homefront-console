import { LoadingButton } from '@mui/lab';
import { IconButton, Menu, MenuItem } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFilterItem,
  GridFilterModel,
  GridRenderCellParams,
  GridSortModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { useCallback, useMemo, useState } from 'react';
import { AddressData } from 'src/@types/opportunity/address/addressData';
import { AddressesQueryFiltersType } from 'src/@types/opportunity/address/queryAddressesData';
import { useAddressesQuery } from 'src/_req-hooks/opportunity/address/useAddressesQuery';
import { useDeleteAddressesMutation } from 'src/_req-hooks/opportunity/address/useDeleteAddressesMutation';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

// ---------------------------------------------------------------------------------
type ActionsMenuProps = {
  address?: AddressData | undefined;
  setCurrentAddress: (address: AddressData) => void;
  reloadAddresses: () => void;
};

function ActionsMenu({ address, setCurrentAddress, reloadAddresses }: ActionsMenuProps) {
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

  const handleSetCurrentAddress = useCallback(() => {
    if (!address) return;
    console.log(address);
    setCurrentAddress(address);
    closeMenu();
  }, [address, setCurrentAddress]);

  const { mutateAsync: deleteAddress, isLoading } = useDeleteAddressesMutation();

  const handleDeleteAddress = useCallback(async () => {
    if (!address) return;
    try {
      await deleteAddress({ ids: address.ID.toString() });
      reloadAddresses();
      enqueueSnackbar('Address deleted successfully', { variant: 'success' });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, deleteAddress]);

  const openDeleteDialog = useCallback(() => {
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
        <MenuItem onClick={openDeleteDialog}>
          <Iconify icon="bxs:trash" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
        <MenuItem onClick={handleSetCurrentAddress}>
          <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
      </Menu>
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Address"
        onClose={closeDeleteDialog}
        content={
          <>
            Are you sure want to delete <strong> {address?.address} </strong> address?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={isLoading}
            onClick={handleDeleteAddress}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}

//---------------------------------------------------------------------------------

type AccountAddressesDataGridProps = {
  setAddress: (address: AddressData) => void;
};

export default function AccountAddressesDataGrid({ setAddress }: AccountAddressesDataGridProps) {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(8);
  const [addressFilters, setAddressFilters] = useState<AddressesQueryFiltersType>({});

  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });

  const { order, order_by } = sort;

  const { data, isLoading, refetch } = useAddressesQuery({
    page: page + 1,
    order,
    order_by,
    per_page: pageSize,
    filters: addressFilters,
  });

  const handleSorts = (model: GridSortModel) => {
    setSort({
      order: model?.[0]?.sort || '',
      order_by: model?.[0]?.field || '',
    });
  };

  const handleFilter = (model: GridFilterModel) => {
    console.log(model);
    const newAddressFilters = model.items.reduce(
      (acc: AddressesQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setAddressFilters(newAddressFilters);
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'ID', headerName: 'ID', width: 50 },
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'full_name', headerName: 'Full Name', flex: 1 },
      { field: 'phone_number', headerName: 'Phone Number', flex: 1 },
      { field: 'address', headerName: 'Address', flex: 1 },
      { field: 'town_city', headerName: 'Town/City', flex: 1 },
      { field: 'state', headerName: 'State', flex: 1 },
      { field: 'zip_code', headerName: 'Zip Code', flex: 1 },
      { field: 'country', headerName: 'Country', flex: 1 },

      {
        field: 'Action',
        headerName: '',
        align: 'right',
        width: 40,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<AddressData>) => (
          <ActionsMenu
            address={params.row}
            setCurrentAddress={setAddress}
            reloadAddresses={refetch}
          />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const rows = data?.data.items || [];
  const totalRows = data?.data.totalRows || 0;

  return (
    <DataGrid
      loading={isLoading}
      pagination
      paginationMode="server"
      pageSizeOptions={[8, 50, 100]}
      paginationModel={{ page, pageSize }}
      columns={columns}
      rows={rows}
      autoHeight
      rowCount={totalRows}
      getRowId={(row) => row.ID}
      // checkboxSelection
      sortingMode="server"
      onSortModelChange={handleSorts}
      filterMode="server"
      onFilterModelChange={handleFilter}
      disableRowSelectionOnClick
      slots={{ toolbar: GridToolbar }}
      onPaginationModelChange={(newPage) => {
        setPage(newPage.page);
        setPageSize(newPage.pageSize);
      }}
    />
  );
}
