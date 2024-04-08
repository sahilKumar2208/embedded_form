import React from 'react';
import { Grid, MenuItem, Typography } from '@mui/material';
import durationLabels from './durationLabels';
import _ from 'lodash';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';

function RenderDurationField({ otherPartyMode, control, fieldDetails }) {
  const label = `${
    fieldDetails.label
      ? _.includes(_.toLower(fieldDetails.label), 'duration')
        ? fieldDetails.label
        : fieldDetails.label + ' duration'
      : 'Duration'
  } ${fieldDetails.isMandatory ? '*' : ''}`;
  return (
    <Grid container>
      <Grid xs={12} sm={4} md={3} sx={{ pr: { xs: 0, sm: 1, md: 1 } }}>
        <RHFSelect
          fullWidth
          sx={{ fontSize: '12px' }}
          disabled={otherPartyMode}
          name={`${fieldDetails.id}.durationLabel`}
          label={`${fieldDetails.label} type ${fieldDetails.isMandatory ? '*' : ''}`}
          InputLabelProps={{ shrink: true }}
          placeholder={`${fieldDetails.label} type ${fieldDetails.isMandatory ? '*' : ''}`}
          // defaultValue={'USD'}
        >
          {durationLabels.map((res) => {
            return (
              <MenuItem sx={{ height: !res.value && '25px' }} key={res.value} value={res.value}>
                <Typography sx={{ textTransform: 'none' }}> {res.label}</Typography>{' '}
              </MenuItem>
            );
          })}
        </RHFSelect>
      </Grid>
      <Grid xs={12} sm={8} md={9} sx={{ pl: { xs: 0, sm: 1, md: 1 } }}>
        <RHFTextField
          disabled={otherPartyMode}
          size="medium"
          placeholder={fieldDetails.placeholder}
          name={`${fieldDetails.id}.durationValue`}
          label={label}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
}

export default RenderDurationField;
