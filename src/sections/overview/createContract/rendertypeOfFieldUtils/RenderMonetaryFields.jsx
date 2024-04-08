import { MenuItem, Grid } from '@mui/material';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify/Iconify';
import _ from 'lodash';

export default function RenderMonetaryFields({ otherPartyMode, control, fieldDetails }) {
  const label = `${
    fieldDetails.label
      ? _.includes(_.toLower(fieldDetails.label), 'amount')
        ? fieldDetails.label
        : fieldDetails.label + ' amount'
      : 'Amount'
  } ${fieldDetails.isMandatory ? '*' : ''}`;
  return (
    <Grid container>
      <Grid xs={12} sm={4} md={3} sx={{ pr: { xs: 0, sm: 1, md: 1 } }}>
        <RHFSelect
          disabled={otherPartyMode}
          name={`${fieldDetails.id}.currencyType`}
          label={`${fieldDetails.label} Type ${fieldDetails.isMandatory ? '*' : ''}`}
          InputLabelProps={{ shrink: true }}
          fullWidth
          placeholder="Choose currency Type"
          // defaultValue={'USD'}
        >
          <MenuItem sx={{ height: '25px' }} value={''}>
            {' '}
          </MenuItem>
          <MenuItem value={'USD'}>
            <Iconify icon="ic:round-money-off" width={16} />
            USD
          </MenuItem>
          <MenuItem value={'INR'}>
            <Iconify icon="ph:currency-inr-bold" width={16} />
            INR
          </MenuItem>
          <MenuItem value={'EUR'}>
            <Iconify icon="ic:sharp-euro" width={16} />
            EUR
          </MenuItem>
          <MenuItem value={'AUD'}>
            <Iconify icon="ic:round-money-off" width={16} />
            AUD (AU Dollor)
          </MenuItem>
        </RHFSelect>
      </Grid>
      <Grid xs={12} sm={8} md={9} sx={{ pl: { xs: 0, sm: 1, md: 1 } }}>
        <RHFTextField
          disabled={otherPartyMode}
          size="medium"
          placeholder={label}
          name={`${fieldDetails.id}.amount`}
          label={label}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
}
