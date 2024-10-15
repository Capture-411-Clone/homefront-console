// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { UpdateUser } from 'src/_requests/opportunity/user';
import {
  UpdateUserRequestBodyType,
  UpdateUserResponseType,
} from 'src/@types/opportunity/user/updateUser';

export function useUpdateUserMutation(
  options?: UseMutationOptions<UpdateUserResponseType, ErrorResponse, UpdateUserRequestBodyType>
) {
  return useMutation<UpdateUserResponseType, ErrorResponse, UpdateUserRequestBodyType>(
    (data: UpdateUserRequestBodyType) => UpdateUser(data),
    options
  );
}
