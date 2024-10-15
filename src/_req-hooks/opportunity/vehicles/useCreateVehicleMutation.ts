// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateVehicleRequestBodyType,
  CreateVehicleResponseType,
} from 'src/@types/opportunity/contract-vehicles/createVehicleData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { CreateVehicle } from 'src/_requests/opportunity/contractVehicles';

// type CreateCategoryMutationType = {
//   requestBody: CreateCategoryRequestType;
// };

export function useCreateVehicleMutation(
  options?: UseMutationOptions<
    CreateVehicleResponseType,
    ErrorResponse,
    CreateVehicleRequestBodyType
  >
) {
  return useMutation<CreateVehicleResponseType, ErrorResponse, CreateVehicleRequestBodyType>(
    (data: CreateVehicleRequestBodyType) => CreateVehicle(data),
    options
  );
}
