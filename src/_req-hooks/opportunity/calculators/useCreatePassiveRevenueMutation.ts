// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreatePassiveRevenueRequestBodyType,
  CreatePassiveRevenueResponseType,
} from 'src/@types/opportunity/calculators/createPassiveRevenueData';

import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import CreatePassiveRevenue from 'src/_requests/opportunity/calculators/createPassiveRevenue';

export function useCreatePassiveRevenueMutation(
  options?: UseMutationOptions<
    CreatePassiveRevenueResponseType,
    ErrorResponse,
    CreatePassiveRevenueRequestBodyType
  >
) {
  return useMutation<
    CreatePassiveRevenueResponseType,
    ErrorResponse,
    CreatePassiveRevenueRequestBodyType
  >((data: CreatePassiveRevenueRequestBodyType) => CreatePassiveRevenue(data), options);
}
