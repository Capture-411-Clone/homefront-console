// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  DeleteWishListRequestBodyType,
  DeleteWishListResponseType,
} from 'src/@types/opportunity/wish-list/deleteWishListData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { DeleteWishList } from 'src/_requests/opportunity/wishList';

export function useDeleteWishListMutation(
  options?: UseMutationOptions<
    DeleteWishListResponseType,
    ErrorResponse,
    DeleteWishListRequestBodyType
  >
) {
  return useMutation<DeleteWishListResponseType, ErrorResponse, DeleteWishListRequestBodyType>(
    (data: DeleteWishListRequestBodyType) => DeleteWishList(data),
    options
  );
}
