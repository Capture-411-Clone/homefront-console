// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateEntitiesRequestType,
  CreateEntitiesResponseBodyType,
} from 'src/@types/opportunity/entity-hunt/createEntities';

import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import CreateEntities from 'src/_requests/opportunity/entity-hunt/createEntities';

// type CreateEntitiesMutationType = {
//   requestBody: CreateEntitiesRequestType;
// };

export function useCreateEntitiesMutation(
  options?: UseMutationOptions<
    CreateEntitiesResponseBodyType,
    ErrorResponse,
    CreateEntitiesRequestType
  >
) {
  return useMutation<CreateEntitiesResponseBodyType, ErrorResponse, CreateEntitiesRequestType>(
    (data: CreateEntitiesRequestType) => CreateEntities(data),
    options
  );
}
