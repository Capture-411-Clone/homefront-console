export interface UploadFileRequestBodyType {
  files: any[];
}

export type UploadFileResponseType = {
  statusCode: number;
  data: string[];
};
