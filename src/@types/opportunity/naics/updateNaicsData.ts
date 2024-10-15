import { NaicsData } from './naicsData';

export type UpdateNaicsRequestBodyType = {
  naics: {
    category_id: number;
    name: string;
  };
  ID: number;
};

export type UpdateNaicsResponseType = {
  statusCode: number;
  data: NaicsData;
};
