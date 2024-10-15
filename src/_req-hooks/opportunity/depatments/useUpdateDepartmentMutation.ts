// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdateDeparmentRequestBodyType,
  UpdateDepartmentResponseType,
} from 'src/@types/opportunity/department/updateDeparmentData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { UpdateDepartment } from 'src/_requests/opportunity/department';

export function useUpdateDepartmentMutation(
  options?: UseMutationOptions<
    UpdateDepartmentResponseType,
    ErrorResponse,
    UpdateDeparmentRequestBodyType
  >
) {
  return useMutation<UpdateDepartmentResponseType, ErrorResponse, UpdateDeparmentRequestBodyType>(
    (data: UpdateDeparmentRequestBodyType) => UpdateDepartment(data),
    options
  );
}
