import { AxiosResponse } from 'axios';
import { QueryEntitiesResponseType } from 'src/@types/opportunity/entity-hunt/queryEntities';
import { opportunity } from 'src/_clients';

export default async function QueryEntities(
  id: string,
  page: number,
  per_page: number,
  order: string,
  order_by: string,
  last_visited_id: string,
  file_name: string,
  year: string,
  solicitation_number: string
): Promise<QueryEntitiesResponseType> {
  const response = await opportunity.get<void, AxiosResponse<QueryEntitiesResponseType>>(
    '/api/v1/entity-hunts',
    {
      params: {
        id,
        page,
        per_page,
        order,
        order_by,
        last_visited_id,
        file_name,
        year,
        solicitation_number,
      },
    }
  );

  return response.data;
}
