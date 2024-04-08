import { MenuItem, Grid } from '@mui/material';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';

export default function RenderPhoneField({ otherPartyMode, control, fieldDetails }) {
  return (
    <Grid container>
      <Grid xs={12} sm={4} md={3} sx={{ pr: { xs: 0, sm: 1, md: 1 } }}>
        <RHFSelect
          disabled={otherPartyMode}
          name={`${fieldDetails.id}.countryCode`}
          label={`Choose Country Code ${fieldDetails.isMandatory ? '*' : ''}`}
          InputLabelProps={{ shrink: true }}
          fullWidth
          placeholder="Choose country code"
          // defaultValue={'USD'}
        >
          <MenuItem sx={{ height: '25px' }} value={''}>
            {' '}
          </MenuItem>
          <MenuItem value={'+91'}>India</MenuItem>
          <MenuItem value={'+1'}>United States</MenuItem>
        </RHFSelect>
      </Grid>
      <Grid xs={12} sm={8} md={9} sx={{ pl: { xs: 0, sm: 1, md: 1 } }}>
        <RHFTextField
          disabled={otherPartyMode}
          size="medium"
          placeholder={fieldDetails.placeholder}
          name={`${fieldDetails.id}.number`}
          label={`${fieldDetails.label} ${fieldDetails.isMandatory ? '*' : ''}`}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
}
