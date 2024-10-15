// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateOfficeRequestBodyType,
  CreateOfficeResponseType,
} from 'src/@types/opportunity/office/createOfficeData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { CreateOffice } from 'src/_requests/opportunity/office';

export function useCreateOfficeMutation(
  options?: UseMutationOptions<CreateOfficeResponseType, ErrorResponse, CreateOfficeRequestBodyType>
) {
  return useMutation<CreateOfficeResponseType, ErrorResponse, CreateOfficeRequestBodyType>(
    (data: CreateOfficeRequestBodyType) => CreateOffice(data),
    options
  );
}
