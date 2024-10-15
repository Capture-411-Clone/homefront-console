import { NaicsData } from './naicsData';

export type CreateNaicsRequestBodyType = {
  category_id: number;
  name: string;
};

export type CreateNaicsResponseType = {
  statusCode: number;
  data: NaicsData;
};
