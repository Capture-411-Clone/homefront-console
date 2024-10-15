import { AxiosResponse } from 'axios';
import {
  UpdateRefundFieldRequestBodyType,
  UpdateRefundFieldResponseType,
} from 'src/@types/opportunity/order/updateRefundFieldData';
import { opportunity } from 'src/_clients';

export default async function UpdateRefundField({
  ID,
}: UpdateRefundFieldRequestBodyType): Promise<UpdateRefundFieldResponseType> {
  const response = await opportunity.patch<
    UpdateRefundFieldRequestBodyType,
    AxiosResponse<UpdateRefundFieldResponseType>
  >(`/api/v1/orders/${ID}/toggle-refund`);

  return response.data;
}
