// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  DeleteDepartmentRequestBodyType,
  DeleteDepartmentResponseType,
} from 'src/@types/opportunity/department/deleteDepartmentData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { DeleteDepartment } from 'src/_requests/opportunity/department';

export function useDeleteDepartmentMutation(
  options?: UseMutationOptions<
    DeleteDepartmentResponseType,
    ErrorResponse,
    DeleteDepartmentRequestBodyType
  >
) {
  return useMutation<DeleteDepartmentResponseType, ErrorResponse, DeleteDepartmentRequestBodyType>(
    (data: DeleteDepartmentRequestBodyType) => DeleteDepartment(data),
    options
  );
}
