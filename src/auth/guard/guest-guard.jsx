import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { PATH_DASHBOARD } from 'src/routes/path';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { Navigate } from 'react-router-dom';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  // const { loading } = useAuthContext();

  // return <>{loading ? <SplashScreen /> : <Container> {children}</Container>}</>;
  const { isAuthenticated, isInitialized } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  if (!isInitialized) {
    return <SplashScreen />;
  }

  return <> {children} </>;
}

GuestGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

// function Container({ children }) {
//   const router = useRouter();

//   const searchParams = useSearchParams();

//   const returnTo = searchParams.get('returnTo') || paths.dashboard.root;

//   const { authenticated } = useAuthContext();

//   const check = useCallback(() => {
//     if (authenticated) {
//       router.replace(returnTo);
//     }
//   }, [authenticated, returnTo, router]);

//   useEffect(() => {
//     check();
//   }, [check]);

//   return <>{children}</>;
// }

// Container.propTypes = {
//   children: PropTypes.node,
// };
