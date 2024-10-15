// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import {
  CreateUserRequestBodyType,
  CreateUserResponseType,
} from 'src/@types/opportunity/user/createUser';
import { CreateUser } from 'src/_requests/opportunity/user';

export function useCreateUserMutation(
  options?: UseMutationOptions<CreateUserResponseType, ErrorResponse, CreateUserRequestBodyType>
) {
  return useMutation<CreateUserResponseType, ErrorResponse, CreateUserRequestBodyType>(
    (data: CreateUserRequestBodyType) => CreateUser(data),
    options
  );
}
