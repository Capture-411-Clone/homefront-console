import { AxiosResponse } from 'axios';
import { DownloadResponseType } from 'src/@types/bytebase/downloadOppoDoc';
import { bytebase } from 'src/_clients';

export default async function DownloadOpportunityDocument(
  key: string
): Promise<DownloadResponseType> {
  const response = await bytebase.get<void, AxiosResponse<DownloadResponseType>>(
    `/api/v1/files/download-opportunity-document/${key}`
  );

  return response.data;
}

export function getDownloadOpportunityDocumentUrl(key: string): string {
  return `${process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL}/api/v1/files/download-opportunity-document/${key}`;
}
