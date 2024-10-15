import { FilterValueString } from 'src/@types/site/filters';
import { MarketData } from './marketData';

export type MarketsQueryFiltersType = {
  title?: FilterValueString;
  createdAt?: FilterValueString;
};

export type QueryMarketsResponseBodyType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: MarketData[];
  };
};
