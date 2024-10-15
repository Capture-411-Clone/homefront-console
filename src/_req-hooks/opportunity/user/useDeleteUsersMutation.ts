// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import {
  DeleteUsersResponseData,
  DeleteUsersRequestBodyData,
} from 'src/@types/opportunity/user/deleteUsers';
import { DeleteUsers } from 'src/_requests/opportunity/user';

export function useDeleteUsersMutation(
  options?: UseMutationOptions<DeleteUsersResponseData, ErrorResponse, DeleteUsersRequestBodyData>
) {
  return useMutation<DeleteUsersResponseData, ErrorResponse, DeleteUsersRequestBodyData>(
    (data: DeleteUsersRequestBodyData) => DeleteUsers(data),
    options
  );
}
