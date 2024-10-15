// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateWishListRequestBodyType,
  CreateWishListResponseType,
} from 'src/@types/opportunity/wish-list/createWishListData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { CreateWishList } from 'src/_requests/opportunity/wishList';

// type CreateCategoryMutationType = {
//   requestBody: CreateCategoryRequestType;
// };

export function useCreateWishListMutation(
  options?: UseMutationOptions<
    CreateWishListResponseType,
    ErrorResponse,
    CreateWishListRequestBodyType
  >
) {
  return useMutation<CreateWishListResponseType, ErrorResponse, CreateWishListRequestBodyType>(
    (data: CreateWishListRequestBodyType) => CreateWishList(data),
    options
  );
}
