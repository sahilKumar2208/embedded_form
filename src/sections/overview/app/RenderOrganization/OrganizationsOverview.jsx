import React from 'react';
import { Helmet } from 'react-helmet-async';
import OrganizationOverview from './OrganizationOverview';

function OrganizationsOverview() {
  return (
    <>
      <Helmet>
        <title> Organizations Details </title>
      </Helmet>
      <OrganizationOverview />
    </>
  );
}

export default OrganizationsOverview;
