import { Typography, Grid, Divider, Tooltip } from '@mui/material';
import { RHFTextField } from 'src/components/hook-form';
import _ from 'lodash';

export default function RenderAddressFields({
  otherPartyMode,
  control,
  fieldDetails,
  labelText = 'Fill the Address in',
}) {
  let addressLabelText = fieldDetails?.label ? fieldDetails.label : labelText;
  addressLabelText = _.startCase(_.camelCase(addressLabelText));

  if (!addressLabelText.includes('Address') && !addressLabelText.includes('Address')) {
    addressLabelText += ' Address';
  }
  return (
    <>
      <Grid xs={12} sm={12} md={12}>
        <Divider sx={{ mt: 1, mb: 1 }} />
      </Grid>
      <Grid xs={12} sm={12} md={12} sx={{ m: 1.5 }}>
        <Typography variant="body" gutterBottom>
          {addressLabelText}
        </Typography>
      </Grid>
      <Grid xs={12} sm={12} md={12}>
        <RHFTextField
          disabled={otherPartyMode}
          size="medium"
          placeholder={fieldDetails.placeholder}
          name={`${fieldDetails.id}.addressLine1`}
          label={`${'Address Line1'}`}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      {/* <Grid mt={2}></Grid> */}
      <Grid container>
        <Grid
          xs={12}
          sm={12}
          md={6}
          sx={{ pr: { md: 0.5, sm: 0, xs: 0 }, mt: { md: 1, sm: 1, xs: 1 } }}
        >
          <RHFTextField
            disabled={otherPartyMode}
            size="medium"
            placeholder={fieldDetails.placeholder}
            name={`${fieldDetails.id}.city`}
            label={`${'Locality/City*'}`}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* <Grid mt={2}></Grid> */}
        <Grid
          xs={12}
          sm={12}
          md={6}
          sx={{ pl: { md: 0.5, sm: 0, xs: 0 }, mt: { md: 1, sm: 1, xs: 1 } }}
        >
          <RHFTextField
            disabled={otherPartyMode}
            size="medium"
            placeholder={fieldDetails.placeholder}
            name={`${fieldDetails.id}.state`}
            label={`${'Region'}`}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* <Grid mt={2}></Grid> */}
        <Grid
          xs={12}
          sm={12}
          md={6}
          sx={{ pr: { md: 0.5, sm: 0, xs: 0 }, mt: { md: 1, sm: 1, xs: 1 } }}
        >
          <RHFTextField
            disabled={otherPartyMode}
            size="medium"
            placeholder={fieldDetails.placeholder}
            name={`${fieldDetails.id}.postCode`}
            label={`${'PIN/Zip Code'}`}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* <Grid mt={2}></Grid> */}
        <Grid
          xs={12}
          sm={12}
          md={6}
          sx={{ pl: { md: 0.5, sm: 0, xs: 0 }, mt: { md: 1, sm: 1, xs: 1 } }}
        >
          <RHFTextField
            disabled={otherPartyMode}
            size="medium"
            placeholder={fieldDetails.placeholder}
            name={`${fieldDetails.id}.country`}
            label={`${'Country*'}`}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      <Grid xs={12} sm={12} md={12}>
        <Divider sx={{ mt: 1, mb: 1 }} />
      </Grid>
    </>
  );
}
