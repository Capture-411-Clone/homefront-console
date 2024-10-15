import { Card } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFilterItem,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { MarketData } from 'src/@types/opportunity/market/marketData';
import { MarketsQueryFiltersType } from 'src/@types/opportunity/market/queryMarketsData';
import { useMarketsQuery } from 'src/_req-hooks/opportunity/market/useGetAllMarketsQuery';
//---------------------------------------------------------------------------------
const columns: GridColDef[] = [
  { field: 'ID', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 90 },
  // {
  //   field: 'departments',
  //   headerName: 'Departments',
  //   align: 'left',
  //   valueGetter: (params: GridValueGetterParams) =>
  //     params.row.departments || '_',
  //   flex: 1,
  // },
];

//---------------------------------------------------------------------------------

export default function MarketListTable() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(
    Number(localStorage.getItem('market-pageSize')) || 8
  );
  const [marketFilters, setMarketFilters] = useState<MarketsQueryFiltersType>({});
  const [sort, setSort] = useState<{ order: string; order_by: string }>({
    order: 'desc',
    order_by: 'id',
  });

  const { order, order_by } = sort;
  const { data, isLoading } = useMarketsQuery({
    page: page + 1,
    order,
    order_by,
    per_page: pageSize,
    filters: marketFilters,
  });

  const rows = data?.data.items || [];
  const totalRows = data?.data.totalRows || 0;

  const handlePageChange = (params: GridPaginationModel) => {
    localStorage.setItem('market-pageSize', params.pageSize.toString());
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
    const newMarketFilters = model.items.reduce(
      (acc: MarketsQueryFiltersType, item: GridFilterItem) => {
        const _value = typeof item.value === 'object' ? item.value.join(',') : item.value;
        return { ...acc, [item.field]: { op: item.operator, value: _value } };
      },
      {}
    );
    setMarketFilters(newMarketFilters);
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
        getRowId={(row: MarketData) => row.ID}
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
