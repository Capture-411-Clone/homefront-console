import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
//
// eslint-disable-next-line import/no-cycle
import { bytebase, opportunity } from 'src/_clients';
// import { RefreshToken } from 'src/_requests/opportunity/auth';
import { ACCESS_TOKEN_STORAGE_KEY } from './auth-provider';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ ExpiresAt: number }>(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.ExpiresAt > currentTime;
};

const setSession = (accessToken: string | null, remember: boolean = true) => {
  if (accessToken) {
    if (remember) {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
    } else {
      sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
    }
    opportunity.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    bytebase.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    delete opportunity.defaults.headers.common.Authorization;
    delete bytebase.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession, verify, sign };
