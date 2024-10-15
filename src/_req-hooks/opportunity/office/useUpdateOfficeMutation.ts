// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdateOfficeRequestBodyType,
  UpdateOfficeResponseType,
} from 'src/@types/opportunity/office/updateOffices';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { UpdateOffice } from 'src/_requests/opportunity/office';

export function useUpdateOfficeMutation(
  options?: UseMutationOptions<UpdateOfficeResponseType, ErrorResponse, UpdateOfficeRequestBodyType>
) {
  return useMutation<UpdateOfficeResponseType, ErrorResponse, UpdateOfficeRequestBodyType>(
    (data: UpdateOfficeRequestBodyType) => UpdateOffice(data),
    options
  );
}
