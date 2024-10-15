// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  OpportunityPdfDocValuesResponseType,
  UploadOpportunityPdfFileRequestBodyType,
} from 'src/@types/opportunity/ai-models/opportunityPdfDocValues';
import { ErrorResponse } from 'src/@types/site/ErrorResponse';
import OpportunityPdfDocValues from 'src/_requests/opportunity/ai-models/opportunityPdfDocValues';

export function useOpportunityPdfDocValuesMutation(
  options?: UseMutationOptions<
    OpportunityPdfDocValuesResponseType,
    ErrorResponse,
    UploadOpportunityPdfFileRequestBodyType
  >
) {
  return useMutation<
    OpportunityPdfDocValuesResponseType,
    ErrorResponse,
    UploadOpportunityPdfFileRequestBodyType
  >((data: UploadOpportunityPdfFileRequestBodyType) => OpportunityPdfDocValues(data), options);
}
