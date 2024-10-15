import { UserData } from 'src/@types/opportunity/user/userData';
import { SitePermissionsType } from 'src/@types/site/permissions';

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type PermissionsType = SitePermissionsType | null;

export type AuthUserType = null | UserData;

export type AuthStateType = {
  user: AuthUserType;
  status?: string;
  loading: boolean;
  isImpersonated?: boolean;
  permissions: PermissionsType;
};

// ----------------------------------------------------------------------

export type JWTContextType = {
  user: AuthUserType;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  permissions: PermissionsType;
  login: (username: string, password: string, remember: boolean) => Promise<void>;
  register: (
    name: string,
    last_name: string,
    email: string,
    password: string,
    session_code: string,
    referralCode?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  resetPassword: (email: string, password: string, session_code: string) => Promise<void>;
};
