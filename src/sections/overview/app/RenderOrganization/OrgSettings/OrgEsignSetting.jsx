import { Grid } from '@mui/material';
import { RHFSwitch, RHFTextField } from 'src/components/hook-form';

export const OrgEsignSetting = () => {
  return (
    <>
      <Grid container columnSpacing={2} />
      <Grid item xs={12} sm={6} md={6}>
        {' '}
        <RHFTextField
          name="envelopePerMonth"
          label="Envelope Per Month*"
          placeholder="Envelope Per Month"
        />{' '}
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <RHFSwitch name="esignEnabled" label="Enable E-sign" />
      </Grid>
    </>
  );
};
