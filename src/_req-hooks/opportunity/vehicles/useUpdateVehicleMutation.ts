// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  UpdateVehicleRequestBodyType,
  UpdateVehicleResponseType,
} from 'src/@types/opportunity/contract-vehicles/updateVehicleData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { UpdateVehicle } from 'src/_requests/opportunity/contractVehicles';

export function useUpdateVehicleMutation(
  options?: UseMutationOptions<
    UpdateVehicleResponseType,
    ErrorResponse,
    UpdateVehicleRequestBodyType
  >
) {
  return useMutation<UpdateVehicleResponseType, ErrorResponse, UpdateVehicleRequestBodyType>(
    (data: UpdateVehicleRequestBodyType) => UpdateVehicle(data),
    options
  );
}
