import { OrderData } from './orderData';

export type UpdateRefundFieldRequestBodyType = {
  ID: number;
};

export type UpdateRefundFieldResponseType = {
  statusCode: number;
  data: OrderData;
};
