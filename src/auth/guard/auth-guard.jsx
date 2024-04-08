import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { LoadingScreen, SplashScreen } from 'src/components/loading-screen';

// import { useAuthContext } from '../hooks';
import LoginPage from 'src/pages/auth/jwt/login';
import Page404 from 'src/pages/403';
import { useAuthContext } from 'src/auth/hooks';
import AuthClassicLayout from 'src/layouts/auth/classic';

// ----------------------------------------------------------------------

const loginPaths = {
  jwt: paths.auth.jwt.login,
  auth0: paths.auth.auth0.login,
  amplify: paths.auth.amplify.login,
  firebase: paths.auth.firebase.login,
  supabase: paths.auth.supabase.login,
};

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  // const { loading } = useAuthContext();
  const { isAuthenticated, isInitialized, user } = useAuthContext();
  console.log('isAuth', isAuthenticated);
  console.log('isInit', isInitialized);
  console.log('userGet at Auth-guard', user);
  // console.log(loading, 'loading');

  // return <>{loading ? <SplashScreen /> : <Container> {children}</Container>}</>;
  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return (
      <>
        <AuthClassicLayout>
          <LoginPage />
        </AuthClassicLayout>
      </>
    );
  }
  if (user?.orgId?._id === null) {
    return <Page404 />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

// function Container({ children }) {
//   const router = useRouter();

//   const { authenticated, method } = useAuthContext();

//   const [checked, setChecked] = useState(false);

//   const check = useCallback(() => {
//     if (!authenticated) {
//       const searchParams = new URLSearchParams({
//         returnTo: window.location.pathname,
//       }).toString();

//       const loginPath = loginPaths[method];

//       const href = `${loginPath}?${searchParams}`;

//       router.replace(href);
//     } else {
//       setChecked(true);
//     }
//   }, [authenticated, method, router]);

//   useEffect(() => {
//     check();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (!checked) {
//     return null;
//   }

//   return <>{children}</>;
// }

// Container.propTypes = {
//   children: PropTypes.node,
// };
