import { Grid } from '@mui/material';
import { RHFSwitch, RHFTextField } from 'src/components/hook-form';

export const OrgAISetting = () => {
  return (
    <>
      <Grid container columnSpacing={2} />
      <Grid item xs={12} sm={6} md={6}>
        {' '}
        <RHFTextField
          name="creditsInUSD"
          label="Credits In USD*"
          placeholder="Credits in USD"
        />{' '}
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <RHFSwitch name="aiEnabled" label="Enable AI assist" />
      </Grid>
    </>
  );
};
