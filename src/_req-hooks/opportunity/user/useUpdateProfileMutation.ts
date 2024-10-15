// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdateProfileRequestBodyType,
  UpdateProfileResponseType,
} from 'src/@types/opportunity/user/updateProfileData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import UpdateProfile from 'src/_requests/opportunity/user/updateProfile';

export function useUpdateProfileMutation(
  options?: UseMutationOptions<
    UpdateProfileResponseType,
    ErrorResponse,
    UpdateProfileRequestBodyType
  >
) {
  return useMutation<UpdateProfileResponseType, ErrorResponse, UpdateProfileRequestBodyType>(
    (data: UpdateProfileRequestBodyType) => UpdateProfile(data),
    options
  );
}
