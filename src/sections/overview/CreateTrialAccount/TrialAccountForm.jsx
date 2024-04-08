import { Button, Divider, Grid, Typography } from '@mui/material';
import { RHFAutocomplete, RHFMultiSelect, RHFSwitch, RHFTextField } from 'src/components/hook-form';
import { AddOtherUserForm } from './AddOtherUserForm';

export const TrialAccountForm = ({ orgs }) => {
  console.log(orgs, 'orgs at form');
  return (
    <>
      {' '}
      <Grid container spacing={1.5} rowGap={1}>
        <Grid item xs={12} sm={6} md={6}>
          <span>
            <RHFTextField
              size="medium"
              name="name"
              label="Organization Name*"
              placeholder="Organization Name"
              InputLabelProps={{ shrink: true }}
            />
          </span>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <span>
            <RHFTextField
              size="medium"
              name="adminFullName"
              label="Admin Full Name*"
              placeholder="Admin Full Name"
              InputLabelProps={{ shrink: true }}
            />
          </span>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <span>
            <RHFTextField
              size="medium"
              name="contactEmail"
              label="Admin Email*"
              placeholder="Admin Email"
              InputLabelProps={{ shrink: true }}
            />
          </span>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <RHFSwitch name="sendEmail" label="Wanna send account creation email to organization?" />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Set default data
          </Typography>
          <Divider variant="middle" />
        </Grid>
        {orgs && orgs?.length > 0 && (
          <Grid item xs={12} sm={6} md={6}>
            <span>
              <RHFAutocomplete
                name="Orgs"
                label="Model Orgs*"
                multiple
                options={orgs}
                getOptionLabel={(option) => option?.name}
                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                ChipProps={{ size: 'small' }}
                placeholder="Select which Org templates to be cloned"
                InputLabelProps={{ shrink: true }}
              />
            </span>
          </Grid>
        )}

        {/* {contractType && contractType?.length > 0 && (
          <Grid item xs={12} sm={6} md={6}>
            <span>
              <RHFAutocomplete
                name="contractType"
                label="Contract Types"
                multiple
                options={contractType}
                getOptionLabel={(option) => option?.contractType}
                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                ChipProps={{ size: 'small' }}
                placeholder="Select contract types"
                InputLabelProps={{ shrink: true }}
              />
            </span>
          </Grid>
        )} */}
      </Grid>
    </>
  );
};
