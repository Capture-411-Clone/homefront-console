'use server';

import { server } from 'src/_clients';

export type SendContactUsMessageEmailRequestType = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

export default async function SendContactUsMessageEmail(
  data: SendContactUsMessageEmailRequestType
) {
  const response = await server.post(`/api/emails/message`, data);

  return response.data;
}
