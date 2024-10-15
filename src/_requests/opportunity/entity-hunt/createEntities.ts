import { AxiosResponse } from 'axios';
import {
  CreateEntitiesRequestType,
  CreateEntitiesResponseBodyType,
} from 'src/@types/opportunity/entity-hunt/createEntities';

import { opportunity } from 'src/_clients';

export default async function CreateEntities(
  data: CreateEntitiesRequestType
): Promise<CreateEntitiesResponseBodyType> {
  const response = await opportunity.post<
    CreateEntitiesRequestType,
    AxiosResponse<CreateEntitiesResponseBodyType>
  >(`/api/v1/entity-hunts`, data);

  return response.data;
}
