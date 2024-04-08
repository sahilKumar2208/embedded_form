import { Grid } from '@mui/material';
import { RHFSwitch, RHFTextField } from 'src/components/hook-form';

export const OrgEditorSetting = () => {
  return (
    <>
      <Grid container columnSpacing={2} />
      <Grid item xs={12} sm={6} md={4}>
        {' '}
        <RHFTextField
          disabled
          name="editorType"
          label="Editor Type"
          placeholder="Credits in USD"
        />{' '}
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        {' '}
        <RHFTextField
          name="maxNumberofUsers"
          label="Max Number of users*"
          placeholder="Max number of users"
        />{' '}
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <RHFSwitch name="editorEnabled" label="Enable Editor" />
      </Grid>
    </>
  );
};
