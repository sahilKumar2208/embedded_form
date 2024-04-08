import { Helmet } from 'react-helmet-async';

import { AmplifyLoginView } from 'src/sections/auth/amplify';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | IntelloSync</title>
      </Helmet>

      <AmplifyLoginView />
    </>
  );
}
