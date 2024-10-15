import { AxiosResponse } from 'axios';
import { GetSiteInfoResponseType } from 'src/@types/opportunity/site-info/getSiteInfoData';
import { opportunity } from 'src/_clients';

export default async function QuerySiteInfo(): Promise<GetSiteInfoResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await opportunity.get<void, AxiosResponse<GetSiteInfoResponseType>>(
    '/api/v1/siteInfo/info'
  );

  return response.data;
}
