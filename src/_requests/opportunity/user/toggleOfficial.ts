import { AxiosResponse } from 'axios';
import { ToggleOfficialResponseType } from 'src/@types/opportunity/user/toggleOfficial';
import { opportunity } from 'src/_clients';

export default async function ToggleOfficial(ID: string): Promise<ToggleOfficialResponseType> {
  const response = await opportunity.patch<void, AxiosResponse<ToggleOfficialResponseType>>(
    `/api/v1/users/${ID}/official/toggle`
  );

  return response.data;
}
