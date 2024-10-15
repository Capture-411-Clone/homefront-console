import { AxiosResponse } from 'axios';
import { ToggleSuspendResponseType } from 'src/@types/opportunity/user/toggleSuspend';
import { opportunity } from 'src/_clients';

export default async function ToggleSuspend(ID: string): Promise<ToggleSuspendResponseType> {
  const response = await opportunity.patch<void, AxiosResponse<ToggleSuspendResponseType>>(
    `/api/v1/users/${ID}/suspend/toggle`
  );

  return response.data;
}
