import { Helmet } from 'react-helmet-async';

import { Organizations, OverviewAppView } from 'src/sections/overview/app/view';

// ----------------------------------------------------------------------

export default function OverviewAppPage() {
  return (
    <>
      <Helmet>
        <title> Support</title>
      </Helmet>

      {/* <OverviewAppView /> */}
      <Organizations />
    </>
  );
}
