import { AxiosResponse } from 'axios';
import {
  GetAllPermissionsReturnType,
  GetOpportunityPermissionsResponseDataType,
} from 'src/@types/site/permissions';
// eslint-disable-next-line import/no-cycle
import { opportunity } from 'src/_clients';

export async function getAllPermissions(): Promise<GetAllPermissionsReturnType> {
  const vaultPermissionsResult = await opportunity.get<
    void,
    AxiosResponse<GetOpportunityPermissionsResponseDataType>
  >('/api/v1/permissions/access-list');
  const { data: vaultPermissions } = vaultPermissionsResult;

  // Merging all the permissions data
  const allPermissions: GetAllPermissionsReturnType = await Promise.all([vaultPermissions]).then(
    (permissions) => ({
      ...permissions[0].data,
    })
  );

  return allPermissions;
}
