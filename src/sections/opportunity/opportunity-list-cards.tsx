import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Stack,
  Button,
  useMediaQuery,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import OpportunityCard from 'src/components/cards/opportunity-card';
import Iconify from 'src/components/iconify';
import { OpportunitiesQueryFiltersType } from 'src/@types/opportunity/opportunity/queryOpportunityData';
import { useOpportunityQuery } from 'src/_req-hooks/opportunity/opportunity/useOpportunityQuery';
import { OpportunityData } from 'src/@types/opportunity/opportunity/opportunityData';
import OpportunityDrawer from 'src/components/drawer/Opportunity-drawer';
import { useTheme } from '@mui/material/styles';
import { SearchType } from 'src/components/drawer/Opportunity-drawer-form';
import { useGetAllOpportunityOwnedIDsQuery } from 'src/_req-hooks/opportunity/order/useGetAllOpportunityOwnedIDsQuery';

type OpportunityListCardsProps = {
  requestMode?: boolean;
  onlyOwner?: boolean;
  myPipeline?: boolean;
};

export default function OpportunityListCards(props: OpportunityListCardsProps) {
  const theme = useTheme();
  const { requestMode, onlyOwner, myPipeline } = props;
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const cachedSearchOpen =
    localStorage.getItem('searchOpen') === 'true' || localStorage.getItem('searchOpen') === null;

  const [searchOpen, setSearchOpen] = useState(cachedSearchOpen);

  const openSearchDrawer = () => {
    setSearchOpen((prev) => {
      localStorage.setItem('searchOpen', String(!prev));
      return !prev;
    });
  };

  const closeSearchDrawer = () => {
    localStorage.setItem('searchOpen', 'false');
    setSearchOpen(false);
  };

  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const theFilter = {
    requested: { op: 'is', value: requestMode ? 'true' : 'false' },
  } as OpportunitiesQueryFiltersType;

  const [filters, setFilters] = useState<OpportunitiesQueryFiltersType>();

  const { data, isLoading, refetch } = useOpportunityQuery(
    {
      page,
      order: 'desc',
      order_by: 'id',
      per_page, // Adjust if necessary
      mine_only: onlyOwner ? 'true' : 'false',
      my_pipeline: myPipeline ? 'true' : 'false',
      query: searchValue,
      filters,
    },
    {
      keepPreviousData: true,
    }
  );

  const { data: ownedData } = useGetAllOpportunityOwnedIDsQuery();
  const opportunityOwnedIDs = ownedData?.data;

  useEffect(() => {
    if (data?.data?.items && data.data?.totalRows > 0) {
      setHasMore(data?.data.items?.length < data.data.totalRows);
    }
  }, [data, data?.data?.items?.length, requestMode, data?.data?.totalRows]);

  const fetchMoreData = () => {
    if (!isLoading) {
      setPerPage((prev) => prev + per_page);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setPage(1);
  };

  const handlerFilters = (search: SearchType) => {
    setPage(1);
    // only set the filters that have a value
    const filledKeys = Object.keys(search).filter((key) => search[key as keyof SearchType] !== '');
    const filledFilters = filledKeys.reduce((acc: OpportunitiesQueryFiltersType, key) => {
      acc[key as keyof OpportunitiesQueryFiltersType] = {
        op: 'contains',
        value: search[key as keyof SearchType],
      };
      return acc;
    }, {} as OpportunitiesQueryFiltersType);

    setFilters({ ...theFilter, ...filledFilters });
  };

  useEffect(() => {
    refetch();
    return () => {
      refetch();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const opportunities = (data?.data?.items as OpportunityData[]) ?? [];

  return (
    <>
      <Stack spacing={1} mb={2}>
        <TextField
          placeholder="Search..."
          fullWidth
          value={searchValue}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" />
              </InputAdornment>
            ),
          }}
        />
        {!lgUp && (
          <Button sx={{ height: 40 }} onClick={openSearchDrawer} variant="outlined" fullWidth>
            Advanced Search
          </Button>
        )}
      </Stack>
      {opportunities.length ? (
        <InfiniteScroll
          dataLength={opportunities.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={null}
        >
          <Grid container spacing={3}>
            {opportunities.map((opportunity, index) => (
              <Grid item xs={12} md={6} lg={6} xl={4} key={index}>
                <OpportunityCard
                  opportunityOwnedIDs={opportunityOwnedIDs}
                  requestMode={requestMode}
                  opportunityData={opportunity}
                  refetch={refetch}
                />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      ) : (
        <Typography variant="h5" align="center" color="text.secondary" sx={{ pt: 5 }}>
          No Opportunities Found
        </Typography>
      )}

      <Stack>
        <OpportunityDrawer
          onOpen={openSearchDrawer}
          onClose={closeSearchDrawer}
          open={searchOpen}
          opportunityFiltersHandler={handlerFilters}
        />
      </Stack>
    </>
  );
}
