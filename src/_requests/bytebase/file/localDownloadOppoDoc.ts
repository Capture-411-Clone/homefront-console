import { bytebase } from 'src/_clients';

export async function getOpportunityDocumentFileAsBlob(filePath: string) {
  // path join base with file path
  try {
    const response = await bytebase.get(`/api/v1/files/download-opportunity-document/${filePath}`, {
      responseType: 'blob', // Important for handling the binary data
    });

    return response.data; // Return the blob
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error; // Rethrow or handle as needed
  }
}
