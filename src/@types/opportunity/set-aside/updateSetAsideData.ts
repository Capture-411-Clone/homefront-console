import { SetAsideData } from './setAsideData';

export type UpdateSetAsideRequestBodyType = {
  setAside: {
    name: string;
    acronym: string;
  };
  ID?: number;
};

export type UpdateSetAsideResponseType = {
  statusCode: number;
  data: SetAsideData;
};
