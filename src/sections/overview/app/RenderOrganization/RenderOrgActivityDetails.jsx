import { Grid, Typography, Avatar, Tooltip, Chip, Divider, Stack } from '@mui/material';
import { fDate, fDateTime } from 'src/utils/format-time';
import React from 'react';
export const RenderOrgActivityDetails = ({ orgActivity, orgUserGroups }) => {
  console.log(orgUserGroups, 'orgUserGroups', orgActivity);
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          <b>Last Logged in at </b>{' '}
          <div>
            <Tooltip title={orgActivity[0]?.fullName} placement="right">
              {orgActivity[0]?.lastLogin ? (
                fDateTime(orgActivity[0]?.lastLogin)
              ) : (
                <div>Not logged in yet</div>
              )}
            </Tooltip>
          </div>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Divider textAlign="left">Groups</Divider>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          <b>User Groups </b>
        </Typography>
      </Grid>
      {orgUserGroups && orgUserGroups.length > 0 ? (
        <Grid item xs={12} sm={12} md={8}>
          {/* <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom> */}
          {/* <b>User Groups </b>{' '} */}
          {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}
          {orgUserGroups?.map((group) => {
            return (
              <>
                <Chip
                  key={group._id}
                  label={group.name}
                  size="medium"
                  variant="soft"
                  sx={{ mr: 1, mb: 1 }}
                />
              </>
            );
          })}
          {/* </div> */}
          {/* </Typography> */}
        </Grid>
      ) : (
        <Grid item xs={12} sm={12} md={8}>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            <div>Not Assigned</div>
          </Typography>
        </Grid>
      )}
    </>
  );
};
