import { Card, Typography } from '@mui/material';
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
import { useMemo, useState } from 'react';
import { StaffReportQueryFiltersType } from 'src/@types/opportunity/opportunity/queryStaffReport';
import { StaffReportResponseData } from 'src/@types/opportunity/opportunity/staffReportData';
import { useStaffReportQuery } from 'src/_req-hooks/opportunity/user/useStaffReportQuery';

export default function StaffReportDataGrid() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(
    Number(localStorage.getItem('staffreport-pageSize')) || 8
  );
  const [userFilters, setUserFilters] = useState<StaffReportQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });

  const { order, order_by } = sort;
  const { data, isLoading } = useStaffReportQuery({
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
        filterable: false,
        sortable: false,
        field: 'name',
        headerName: 'Name',
        flex: 1,
        renderCell: (params: GridRenderCellParams<StaffReportResponseData>) =>
          params.row?.user.name,
      },
      {
        filterable: false,
        sortable: false,
        field: 'last_name',
        headerName: 'Last Name',
        flex: 1,
        renderCell: (params: GridRenderCellParams<StaffReportResponseData>) =>
          params.row?.user.last_name,
      },
      {
        field: 'email',
        width: 450,
        headerName: 'Email',
        flex: 1,
        renderCell: (params: GridRenderCellParams<StaffReportResponseData>) => (
          <Typography color={params.row?.user.email_verified_at ? 'text.primary' : 'error'}>
            {params.row?.user.email}
          </Typography>
        ),
      },
      {
        filterable: false,
        sortable: false,
        field: 'contribution_count',
        headerName: 'Contributions',
        flex: 1,
        renderCell: (params: GridRenderCellParams<StaffReportResponseData>) =>
          params.row?.contribution_count,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const rows = data?.data.items || [];
  const totalRows = data?.data.totalRows || 0;

  const handlePageChange = (params: GridPaginationModel) => {
    localStorage.setItem('staffreport-pageSize', params.pageSize.toString());
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
      (acc: StaffReportQueryFiltersType, item: GridFilterItem) => {
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
        getRowId={(row: StaffReportResponseData) => row.user.ID}
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
