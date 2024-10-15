// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdateNotificationRequestBodyType,
  UpdateNotificationResponseType,
} from 'src/@types/opportunity/notification/updateNotificationData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import UpdateNotification from 'src/_requests/opportunity/notification/updateNotification';

export function useUpdateNotificationMutation(
  options?: UseMutationOptions<
    UpdateNotificationResponseType,
    ErrorResponse,
    UpdateNotificationRequestBodyType
  >
) {
  return useMutation<
    UpdateNotificationResponseType,
    ErrorResponse,
    UpdateNotificationRequestBodyType
  >((data: UpdateNotificationRequestBodyType) => UpdateNotification(data), options);
}
