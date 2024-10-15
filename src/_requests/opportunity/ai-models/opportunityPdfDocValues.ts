import { AxiosResponse } from 'axios';
import {
  OpportunityPdfDocValuesResponseType,
  UploadOpportunityPdfFileRequestBodyType,
} from 'src/@types/opportunity/ai-models/opportunityPdfDocValues';
import { opportunity } from 'src/_clients';

export default async function OpportunityPdfDocValues(
  data: UploadOpportunityPdfFileRequestBodyType
): Promise<OpportunityPdfDocValuesResponseType> {
  const formData = new FormData();
  // Append all files to formData under the same key 'files'
  data.files.forEach((file: any) => formData.append('files', file));

  const response = await opportunity.post<
    UploadOpportunityPdfFileRequestBodyType,
    AxiosResponse<OpportunityPdfDocValuesResponseType>
  >(`/api/v1/opportunities/pdf-doc-values`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
