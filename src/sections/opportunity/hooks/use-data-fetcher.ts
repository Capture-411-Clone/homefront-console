import { UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';

// Define common types
interface QueryParams {
  page: number;
  filters: Record<string, any>;
  per_page: number;
}

interface QueryResponse<T> {
  data: {
    items: T[];
    totalRows: number;
  };
}

interface State<T> {
  data: T[] | null;
  totalCount: number;
  filters: Record<string, any>;
  perPage: number;
}

// Define the type for the query hook
type QueryHook<T> = (
  params: QueryParams,
  options?: { onSuccess: (data: QueryResponse<T>) => void }
) => UseQueryResult<QueryResponse<T>, unknown>;

// Custom hook for data fetching and state management
export function useDataFetcher<T>(
  queryHook: QueryHook<T>,
  initialState: State<T>,
  stateSetter?: React.Dispatch<React.SetStateAction<State<T>>>
) {
  const [state, setState] = useState<State<T>>(initialState);

  const { refetch, isLoading } = queryHook(
    {
      page: 1,
      filters: state.filters,
      per_page: state.perPage,
    },
    {
      onSuccess(data) {
        const newState = {
          ...state,
          data: data.data.items,
          totalCount: data.data.totalRows,
        };
        setState(newState);
        if (stateSetter) {
          stateSetter(newState);
        }
      },
    }
  );

  return { refetch, isLoading, state };
}
