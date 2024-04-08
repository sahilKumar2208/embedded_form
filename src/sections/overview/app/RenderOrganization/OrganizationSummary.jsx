import { Box, Grid } from '@mui/material';
import React from 'react';
import OrganizationDetails from './OrganizationDetails';
import OrganizationActions from './OrganizationsActions';

export default function OrganizationSummary({
  organization,
  setOrgDetails,
  orgActivity,
  orgUserGroups,
}) {
  return (
    <Grid container rowSpacing={1} spacing={1}>
      <Grid item xs={12} sm={8} md={8}>
        <Box
          sx={{
            flexGrow: 1,
            height: '100%',
            border: '1px solid',
            borderColor: 'grey.100',
            borderRadius: '10px',
            padding: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
          }}
        >
          <OrganizationDetails
            organization={organization}
            orgActivity={orgActivity}
            orgUserGroups={orgUserGroups}
          />
          <br />
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <Box
          sx={{
            height: '100%',
            // border: '1px solid',
            borderColor: 'grey.100',
            borderRadius: '10px',
            padding: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
          }}
        >
          <OrganizationActions setOrgDetails={setOrgDetails} organization={organization} />
        </Box>
      </Grid>
    </Grid>
  );
}
