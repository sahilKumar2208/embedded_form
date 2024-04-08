import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

// import axios, { endpoints } from 'src/utils/axios';
import axios from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';
import localStorageAvailable from 'src/utils/localStorageAvailable';
import { jwtDecode } from 'jwt-decode';
import { AUTH_URL } from 'src/config-global';
// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  isLoggedOut: false,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
      isLoggedOut: false,
      loading: false,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      isLoggedOut: false,
    };
  }
  // if (action.type === 'REGISTER') {
  //   return {
  //     ...state,
  //     isAuthenticated: true,
  //     user: action.payload.user,
  //   };
  // }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      isLoggedOut: true,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

// const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storageAvailable = localStorageAvailable();
  const navigateTo = (path) => {
    window.history.pushState(null, null, path);
    window.dispatchEvent(new Event('popstate'));
  };

  const initialize = useCallback(async () => {
    try {
      // const accessToken = sessionStorage.getItem(STORAGE_KEY);
      const accessToken = storageAvailable && localStorage.getItem('accessToken');
      console.log(accessToken, 'accessToken');

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        var decoded = jwtDecode(accessToken);
        console.log(decoded, 'decoded');
        const user = {
          _id: decoded.userId,
          fullName: decoded.fullName,
          email: decoded.email,
          orgId: {
            _id: decoded.orgId,
          },
          role: decoded.role,
          profileURL: decoded.profileURL,
          editorAccess: decoded.editorAccess,
        };

        console.log('user to check userGroups: ', user);

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }

      // if (accessToken && isValidToken(accessToken)) {
      //   setSession(accessToken);

      //   const response = await axios.get(endpoints.auth.me);

      //   const { user } = response.data;

      //   dispatch({
      //     type: 'INITIAL',
      //     payload: {
      //       user: {
      //         ...user,
      //         accessToken,
      //       },
      //     },
      //   });
      // } else {
      //   dispatch({
      //     type: 'INITIAL',
      //     payload: {
      //       user: null,
      //     },
      //   });
      // }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // SAVE ACCESS TOKEN
  const saveAccessToken = useCallback(async (accessToken, user) => {
    try {
      if (accessToken && isValidToken(accessToken)) {
        var decoded = jwtDecode(accessToken);
        console.log(decoded, 'decoded');

        const decodeduser = {
          _id: decoded.userId,
          fullName: decoded.fullName,
          email: decoded.email,
          orgId: {
            _id: decoded.orgId,
          },
          role: decoded.role,
          profileURL: decoded.profileURL,
          editorAccess: decoded.editorAccess,
        };

        console.log(user, 'user');

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user: user ? user : decodeduser,
          },
        });
        localStorage.setItem('accessToken', accessToken);
        setSession(accessToken);
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  // LOGIN
  const login = useCallback(async (email, otp) => {
    const data = {
      email,
      otp,
    };

    console.log('login data get', data);

    const response = await axios.post('/v1/support/login/otp', data);

    const { accessToken, user } = response.data['data'];

    setSession(accessToken);

    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          user,
        },
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    console.log('logout called');
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  // const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  // const status = state.loading ? 'loading' : checkAuthenticated;

  // const memoizedValue = useMemo(
  //   () => ({
  //     user: state.user,
  //     method: 'jwt',
  //     // loading: status === 'loading',
  //     authenticated: status === 'authenticated',
  //     unauthenticated: status === 'unauthenticated',
  //     login,
  //     // register,
  //     logout,
  //   }),
  //   // [login, logout, register, state.user, status]
  //   [login, logout, state.user]
  // );

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      login,
      logout,
      saveAccessToken,
    }),
    [state.isAuthenticated, status, state.isInitialized, state.user, login, logout, saveAccessToken]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
