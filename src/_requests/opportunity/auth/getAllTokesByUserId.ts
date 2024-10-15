import { AxiosResponse } from 'axios';
import { GetAllTokesByUserIdResponseTyp } from 'src/@types/opportunity/auth/getAllTokesByUserId';
// eslint-disable-next-line import/no-cycle
import { opportunity } from 'src/_clients';

export default async function GetAllTokensByUserId(
  userID: string
): Promise<GetAllTokesByUserIdResponseTyp> {
  const response = await opportunity.get<void, AxiosResponse<GetAllTokesByUserIdResponseTyp>>(
    `/v1/tokens/${userID}`
  );

  return response.data;
}
