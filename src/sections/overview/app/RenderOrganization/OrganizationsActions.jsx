// import TouchAppIcon from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axiosInstance from 'src/utils/axios';
import { ActivateDeactivate } from './Actions/ActivateDeactivate';
import { Button, Grid, Typography } from '@mui/material';
import { Groups as GroupsIcon } from '@mui/icons-material';
import AdsClickIcon from '@mui/icons-material/AdsClick';

const style = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  color: 'teal',
  '&:hover': {
    color: 'teal',
  },
};
export default function OrganizationActions({ organization, setOrgDetails }) {
  console.log('isOrg deleted', organization?.isDeleted);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newAlignment) => {
    // setAlignment(newAlignment);
    setLoading(true);
    console.log('algnment', newAlignment);
    if (newAlignment === null) {
      alert('Action already in active state');
      setLoading(false);
      return;
    }
    switch (newAlignment) {
      case 'Activate':
        // Call Activate API
        callActivateApi();
        break;
      case 'Deactivate':
        // Call Deactivate API
        callDeactivateApi();
        break;
      default:
        break;
    }
  };
  const { id } = useParams();
  const navigate = useNavigate();

  const callActivateApi = async () => {
    console.log('Activated the account');
    try {
      const org = await axiosInstance.post(`/v1/support/org/${id}/activated`);
      setOrgDetails(org.data);
      console.log('org at activate', organization);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const callDeactivateApi = async () => {
    console.log('DeActivated the account');
    try {
      const org = await axiosInstance.post(`/v1/support/org/${id}/deactivated`);
      setOrgDetails(org.data);
      console.log('org at deactivate', organization);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloneContractType = () => {
    navigate(`/organization/${id}/contracts`);
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xm={12} sm={12} md={12} style={style}>
          <Typography sx={{ fontSize: 25 }} color="text.info" gutterBottom>
            <b>Actions</b>
          </Typography>
        </Grid>

        <Grid item xm={12} sm={12} md={12} style={style}>
          <AdsClickIcon color="inherit" sx={{ mr: 1 }} />
          <ActivateDeactivate
            organization={organization}
            handleChange={handleChange}
            loading={loading}
          />
        </Grid>
      </Grid>
      <Grid item xm={12} sm={12} md={12} style={style}>
        <Button color="inherit" underline="none" onClick={handleCloneContractType}>
          <GroupsIcon sx={{ mr: 1 }} />
          <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: 'inherit' }}>
            Contract Type
          </Typography>
        </Button>
      </Grid>
    </>
  );
}
