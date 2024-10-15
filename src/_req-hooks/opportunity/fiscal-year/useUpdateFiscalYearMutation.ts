// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdateFiscalYearRequestBodyType,
  UpdateFiscalYearResponseType,
} from 'src/@types/opportunity/fiscal-year/updateFiscalYearData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { UpdateFiscalYear } from 'src/_requests/opportunity/fiscal-year';

export function useUpdateFiscalYearMutation(
  options?: UseMutationOptions<
    UpdateFiscalYearResponseType,
    ErrorResponse,
    UpdateFiscalYearRequestBodyType
  >
) {
  return useMutation<UpdateFiscalYearResponseType, ErrorResponse, UpdateFiscalYearRequestBodyType>(
    (data: UpdateFiscalYearRequestBodyType) => UpdateFiscalYear(data),
    options
  );
}
