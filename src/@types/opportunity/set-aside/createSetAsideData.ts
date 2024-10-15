import { SetAsideData } from './setAsideData';

export type CreateSetAsideRequestBodyType = {
  name: string;
  acronym: string;
};

export type CreateSetAsideResponseType = {
  statusCode: number;
  data: SetAsideData;
};
