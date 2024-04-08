import { Grid, Typography, Avatar, Tooltip, Chip, Divider, Stack } from '@mui/material';
import moment from 'moment/moment';
import Label from 'src/components/label';
import { fDate, fDateTime } from 'src/utils/format-time';
import React from 'react';

export const RenderOrganizationDetails = ({ organization }) => {
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          <b>Org Logo </b> <Avatar alt={organization?.name} src={organization?.orgLogoUrl} />
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          <b>Org Name </b> <div>{organization?.name}</div>
        </Typography>
      </Grid>
      {/* <Grid item xs={12} sm={12} md={12}>
      <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center' }}>
        <Avatar alt={organization?.name} src={organization?.orgLogoUrl} />
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          <div>{organization?.name}</div>
        </Typography>
      </Stack>
    </Grid> */}
      <Grid item xs={12} sm={6} md={4}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          <b>Status</b>{' '}
          <div>
            <Label
              color={
                (organization?.isDeleted === true && 'error') ||
                (organization?.isDeleted === false && 'success') ||
                'success'
              }
            >
              {organization?.isDeleted ? 'DeActivated' : 'Activated'}
            </Label>
          </div>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Divider textAlign="left">Address</Divider>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          <b> Permanent Address </b>{' '}
          <div style={{ textTransform: 'capitalize' }}>
            {typeof organization?.permanentAddress === 'string'
              ? organization?.permanentAddress
              : organization?.permanentAddress?.line}
          </div>
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          <b>Address Code </b> <div>{organization?.addressCode}</div>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          <b>City </b> <div style={{ textTransform: 'capitalize' }}>{organization?.city}</div>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          <b>State </b> <div style={{ textTransform: 'capitalize' }}>{organization?.state}</div>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          <b>Country </b> <div style={{ textTransform: 'capitalize' }}>{organization?.country}</div>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          <b>Created At </b> <div>{fDate(organization?.createdAt)}</div>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          <b>Modified At </b> <div>{fDate(organization?.updatedAt)}</div>
        </Typography>
      </Grid>
    </>
  );
};
