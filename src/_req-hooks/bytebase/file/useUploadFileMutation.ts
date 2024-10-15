// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UploadFileRequestBodyType, UploadFileResponseType } from 'src/@types/bytebase/file';

import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import UploadFile from 'src/_requests/bytebase/file/uploadFile';

export function useUploadFileMutation(
  options?: UseMutationOptions<UploadFileResponseType, ErrorResponse, UploadFileRequestBodyType>
) {
  return useMutation<UploadFileResponseType, ErrorResponse, UploadFileRequestBodyType>(
    (data: UploadFileRequestBodyType) => UploadFile(data),
    options
  );
}
