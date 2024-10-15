'use client';

import { useEffect, useReducer, useCallback, useMemo } from 'react';
//
import { getAllPermissions } from 'src/_requests/opportunity/site/getAllPermissions';
import {
  Logout as logoutRequest,
  ResetPassword as resetPasswordRequest,
  Login as loginRequest,
  Register as registerRequest,
} from 'src/_requests/opportunity/auth';
import UserInfo from 'src/_requests/opportunity/auth/userInfo';
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, PermissionsType } from '../types';
import { AuthContext } from './auth-context';

enum Types {
  Impersonate = 'IMPERSONATE',
  Revert = 'REVERT',
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
  Loading = 'LOADING',
}

type Payload = {
  [Types.Impersonate]: {
    user: AuthUserType;
  };
  [Types.Revert]: {
    user: AuthUserType;
  };
  [Types.Initial]: {
    isImpersonated: boolean;
    permissions: PermissionsType;
    user: AuthUserType;
  };
  [Types.Login]: {
    user: AuthUserType;
    permissions: PermissionsType;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUserType;
    permissions: PermissionsType;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
  permissions: null,
  isImpersonated: false,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.Impersonate) {
    return {
      ...state,
      user: action.payload.user,
      isImpersonated: true,
    };
  }
  if (action.type === Types.Revert) {
    return {
      ...state,
      user: action.payload.user,
      isImpersonated: false,
    };
  }
  if (action.type === Types.Initial) {
    return {
      loading: false,
      user: action.payload.user,
      permissions: action.payload.permissions,
      isImpersonated: action.payload.isImpersonated,
    };
  }
  if (action.type === Types.Login) {
    return {
      ...state,
      user: action.payload.user,
      permissions: action.payload.permissions,
    };
  }
  if (action.type === Types.Register) {
    return {
      ...state,
      permissions: action.payload.permissions,
      user: action.payload.user,
    };
  }
  if (action.type === Types.Logout) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
export const BACKUP_ACCESS_TOKEN_STORAGE_KEY = 'backupAccessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken =
        localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ||
        sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        // TODO: later i should cache remember to set it here otherwise in refresh always remember will be true
        setSession(accessToken);

        const response = await UserInfo();
        const user = response.data;

        const permissions = await getAllPermissions();

        dispatch({
          type: Types.Initial,
          payload: {
            user,
            permissions,
            isImpersonated: false,
          },
        });
      } else {
        dispatch({
          type: Types.Initial,
          payload: {
            user: null,
            permissions: null,
            isImpersonated: false,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.Initial,
        payload: {
          user: null,
          permissions: null,
          isImpersonated: false,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (username: string, password: string, remember: boolean) => {
    const data = {
      username,
      password,
    };

    const {
      data: { access_token, user },
    } = await loginRequest(data);

    setSession(access_token, remember);

    const permissions = await getAllPermissions();

    dispatch({
      type: Types.Login,
      payload: {
        user,
        permissions,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (
      name: string,
      last_name: string,
      email: string,
      password: string,
      session_code: string,
      referralCode?: string
    ) => {
      const data = {
        name,
        last_name,
        email,
        password,
        session_code,
        referred_with_code: referralCode || '',
      };

      const response = await registerRequest(data);
      const { access_token, user } = response.data;

      setSession(access_token);

      const permissions = await getAllPermissions();

      dispatch({
        type: Types.Register,
        payload: {
          user,
          permissions,
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      setSession(null);
      dispatch({ type: Types.Logout });
    }
  }, []);

  const resetPassword = useCallback(
    async (email: string, password: string, session_code: string) => {
      const data = {
        email,
        password,
        session_code,
      };

      const response = await resetPasswordRequest(data);
      const { user, access_token } = response.data;

      setSession(access_token);

      const permissions = await getAllPermissions();

      dispatch({
        type: Types.Login,
        payload: {
          user,
          permissions,
        },
      });
    },
    []
  );

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      permissions: state.permissions,
      //
      login,
      register,
      logout,
      resetPassword,
      initialize,
    }),
    [login, logout, register, resetPassword, status, state.user, state.permissions, initialize]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
