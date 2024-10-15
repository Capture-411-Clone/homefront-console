import { LoadingButton } from '@mui/lab';
import { Card, Tooltip, Button } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFilterItem,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useMemo, useState } from 'react';
import { OrderData } from 'src/@types/opportunity/order/orderData';
import { OrdersQueryFiltersType } from 'src/@types/opportunity/order/queryOrdersData';
import { useOrdersQuery } from 'src/_req-hooks/opportunity/order/userGetAllOrdersQuery';
import { useUpdateRefundFieldMutation } from 'src/_req-hooks/opportunity/order/useUpdateRefundFieldMutation';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Label from 'src/components/label';
import { fToNow } from 'src/utils/format-time';

//---------------------------------------------------------------------------------

export default function OrdersListTable() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(
    Number(localStorage.getItem('orders-pageSize')) || 8
  );
  const [ordersFilters, setOrdersFilters] = useState<OrdersQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<OrderData | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const { order, order_by } = sort;
  const {
    data,
    isLoading,
    refetch: getAllOrders,
  } = useOrdersQuery({
    page: page + 1,
    order,
    order_by,
    per_page: pageSize,
    filters: ordersFilters,
  });

  const { mutate: updateRefund, isLoading: isUpdateRefundLoading } = useUpdateRefundFieldMutation({
    onSettled: () => setIsRefundDialogOpen(false),
    onSuccess: () => {
      getAllOrders();
      enqueueSnackbar('Refund Success', { variant: 'success' });
    },
  });

  const rows = data?.data.items || [];
  const totalRows = data?.data.totalRows || 0;

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'ID', headerName: 'ID', width: 90 },
      {
        field: 'paid_at',
        headerName: 'Paid At',
        width: 150,
        renderCell: (params) => (params.value ? fToNow(params.value) : '-'),
      },
      {
        field: 'opportunity',
        headerName: 'Opportunity Title',
        width: 250,
        valueGetter: (params) => params.row.opportunity.title,
      },
      {
        field: 'opportunity_id',
        headerName: 'Solicitation Number',
        width: 150,
        valueGetter: (params) => params.row.opportunity.solicitation_number,
      },
      {
        field: 'price_amount',
        headerName: 'Amount',
        width: 150,
      },
      {
        field: 'refunded_at',
        headerName: 'Refunded',
        width: 150,
        renderCell: (params) =>
          params.value ? (
            <Tooltip title={fToNow(params.value)}>
              <Label variant="outlined" color="warning">
                Refunded
              </Label>
            </Tooltip>
          ) : (
            '-'
          ),
      },
      {
        field: 'user',
        headerName: 'Actions',
        renderCell: (params) => (
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setCurrentOrder(params.row as OrderData);
              setIsRefundDialogOpen(true);
            }}
          >
            Refund
          </Button>
        ),
      },
    ],
    []
  );

  const handlePageChange = (params: GridPaginationModel) => {
    localStorage.setItem('orders-pageSize', params.pageSize.toString());
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
    const newOrdersFilters = model.items.reduce(
      (acc: OrdersQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setOrdersFilters(newOrdersFilters);
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
        getRowId={(row: OrderData) => row.ID}
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
      <ConfirmDialog
        open={isRefundDialogOpen}
        title="Refund Order"
        onClose={() => setIsRefundDialogOpen(false)}
        content={
          <>
            Are you sure want to refund order with order id: <strong> {currentOrder?.ID} </strong>?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="success"
            loading={isUpdateRefundLoading}
            onClick={() => {
              updateRefund({ ID: currentOrder?.ID || 0 });
            }}
          >
            Refund
          </LoadingButton>
        }
      />
    </Card>
  );
}
