export type CreateEntitiesRequestType = {
  details: string;
  solicitation_number: string;
  file_name: string;
  file_path: string;
  year: string;
};

type CreateEntitiesResponseData = {
  ID: number;
  details: string;
  solicitation_number: string;
  file_name: string;
  file_path: string;
  year: string;
};

export type CreateEntitiesResponseBodyType = {
  statusCode: number;
  data: CreateEntitiesResponseData;
};
