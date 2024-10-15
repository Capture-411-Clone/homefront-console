import { AxiosResponse } from 'axios';
import { opportunity } from 'src/_clients';

export default async function DownloadAllDocuments(id: string): Promise<Blob> {
  const response = await opportunity.get<void, AxiosResponse<Blob>>(
    `/api/v1/opportunities/${id}/download-all-documents`,
    { responseType: 'blob' }
  );

  return response.data;
}
