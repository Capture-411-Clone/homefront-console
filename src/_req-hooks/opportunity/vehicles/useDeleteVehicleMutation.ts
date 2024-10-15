// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  DeleteVehicleRequestBodyType,
  DeleteVehicleResponseType,
} from 'src/@types/opportunity/contract-vehicles/deleteVehicleData';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import { DeleteVehicle } from 'src/_requests/opportunity/contractVehicles';

export function useDeleteVehicleMutation(
  options?: UseMutationOptions<
    DeleteVehicleResponseType,
    ErrorResponse,
    DeleteVehicleRequestBodyType
  >
) {
  return useMutation<DeleteVehicleResponseType, ErrorResponse, DeleteVehicleRequestBodyType>(
    (data: DeleteVehicleRequestBodyType) => DeleteVehicle(data),
    options
  );
}
