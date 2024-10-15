// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateFiscalYearRequestBodyType,
  CreateFiscalYearResponseType,
} from 'src/@types/opportunity/fiscal-year/createFiscalYearData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { CreateFiscalYear } from 'src/_requests/opportunity/fiscal-year';

export function useCreateFiscalYearMutation(
  options?: UseMutationOptions<
    CreateFiscalYearResponseType,
    ErrorResponse,
    CreateFiscalYearRequestBodyType
  >
) {
  return useMutation<CreateFiscalYearResponseType, ErrorResponse, CreateFiscalYearRequestBodyType>(
    (data: CreateFiscalYearRequestBodyType) => CreateFiscalYear(data),
    options
  );
}
