import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { RenderOrganizationDetails } from './RenderOrganizationDetails';
import { RenderOrgActivityDetails } from './RenderOrgActivityDetails';
import { SplashScreen } from 'src/components/loading-screen';

export default function OrganizationDetails({ organization, orgActivity, orgUserGroups }) {
  return (
    <>
      {!organization || !orgActivity || !orgUserGroups ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container rowSpacing={1.5} sx={{ p: 1 }}>
            <RenderOrganizationDetails organization={organization} />
            <RenderOrgActivityDetails orgActivity={orgActivity} orgUserGroups={orgUserGroups} />
          </Grid>
        </>
      )}
    </>
  );
}
