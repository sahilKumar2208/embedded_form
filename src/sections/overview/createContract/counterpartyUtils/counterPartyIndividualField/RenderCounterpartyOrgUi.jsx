import React from 'react';
import { Grid } from '@mui/material';
import { RHFAutocomplete } from 'src/components/hook-form';
import { useFormContext } from 'react-hook-form';
import RenderCounterPartyOrgInfo from './RenderCounterPartyOrgInfo';

function RenderCounterpartyOrgUi({ fieldDetails, counterparties, fields }) {
  const { watch } = useFormContext();
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <RHFAutocomplete
          name={`${fieldDetails.id}`}
          label={`Choose Counterparty(Organization)*`}
          // multiple
          // freeSolo
          options={counterparties}
          getOptionLabel={(option) => option.registeredName}
          // isOptionEqualToValue={(option, value) => option._id === value._id}
          ChipProps={{ size: 'small' }}
        />
      </Grid>
      {watch(fieldDetails.id) &&
        fields.map((item) => {
          return <RenderCounterPartyOrgInfo item={item} fieldDetails={fieldDetails} />;
        })}
    </Grid>
  );
}

export default RenderCounterpartyOrgUi;
