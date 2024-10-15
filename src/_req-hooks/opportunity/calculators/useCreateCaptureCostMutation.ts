// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateCaptureCostRequestBodyType,
  CreateCaptureCostResponseType,
} from 'src/@types/opportunity/calculators/createCaptureCostData';

import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import CreateCaptureCost from 'src/_requests/opportunity/calculators/createCaptureCost';

export function useCreateCaptureCostMutation(
  options?: UseMutationOptions<
    CreateCaptureCostResponseType,
    ErrorResponse,
    CreateCaptureCostRequestBodyType
  >
) {
  return useMutation<
    CreateCaptureCostResponseType,
    ErrorResponse,
    CreateCaptureCostRequestBodyType
  >((data: CreateCaptureCostRequestBodyType) => CreateCaptureCost(data), options);
}
