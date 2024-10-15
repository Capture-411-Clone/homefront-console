// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  DeleteFiscalYearRequestBodyType,
  DeleteFiscalYearResponseType,
} from 'src/@types/opportunity/fiscal-year/deleteFiscalYearData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { DeleteFiscalYear } from 'src/_requests/opportunity/fiscal-year';

export function useDeleteFiscalYearMutation(
  options?: UseMutationOptions<
    DeleteFiscalYearResponseType,
    ErrorResponse,
    DeleteFiscalYearRequestBodyType
  >
) {
  return useMutation<DeleteFiscalYearResponseType, ErrorResponse, DeleteFiscalYearRequestBodyType>(
    (data: DeleteFiscalYearRequestBodyType) => DeleteFiscalYear(data),
    options
  );
}
