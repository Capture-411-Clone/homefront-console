// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  ChangePasswordRequestBodyType,
  ChangePasswordResponseType,
} from 'src/@types/opportunity/auth/changePassword';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { ChangePassword } from 'src/_requests/opportunity/auth';

export function useChangePasswordMutation(
  options?: UseMutationOptions<
    ChangePasswordResponseType,
    ErrorResponse,
    ChangePasswordRequestBodyType
  >
) {
  return useMutation<ChangePasswordResponseType, ErrorResponse, ChangePasswordRequestBodyType>(
    (data: ChangePasswordRequestBodyType) => ChangePassword(data),
    options
  );
}
