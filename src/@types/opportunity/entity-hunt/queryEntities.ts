import { EntityData } from './entityData';

export type QueryEntitiesResponseType = {
  statusCode: number;
  data: {
    limit: number;
    offset: number;
    page: number;
    totalRows: number;
    totalPages: number;
    items: EntityData[];
  };
};
