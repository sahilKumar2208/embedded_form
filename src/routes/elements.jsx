import { Suspense, lazy } from 'react';
// components
import { LoadingScreen, SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => (
  <Suspense fallback={<SplashScreen />}>
    <Component {...props} />
  </Suspense>
);

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('src/pages/auth/jwt/login')));
