import { AxiosResponse } from 'axios';
import {
  DeleteTokensRequestBodyType,
  DeleteTokensResponseType,
} from 'src/@types/opportunity/auth/deleteTokens';
// eslint-disable-next-line import/no-cycle
import { opportunity } from 'src/_clients';

export default async function DeleteTokens(data: DeleteTokensRequestBodyType) {
  const response = await opportunity.delete<
    DeleteTokensRequestBodyType,
    AxiosResponse<DeleteTokensResponseType>
  >('/v1/tokens', {
    data,
  });

  return response.data;
}
