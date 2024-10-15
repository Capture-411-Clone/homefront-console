// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateDepartmentRequestBodyType,
  CreateDepartmentResponseType,
} from 'src/@types/opportunity/department/createDepartmentData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { CreateDepartment } from 'src/_requests/opportunity/department';

export function useCreateDepartmentMutation(
  options?: UseMutationOptions<
    CreateDepartmentResponseType,
    ErrorResponse,
    CreateDepartmentRequestBodyType
  >
) {
  return useMutation<CreateDepartmentResponseType, ErrorResponse, CreateDepartmentRequestBodyType>(
    (data: CreateDepartmentRequestBodyType) => CreateDepartment(data),
    options
  );
}
