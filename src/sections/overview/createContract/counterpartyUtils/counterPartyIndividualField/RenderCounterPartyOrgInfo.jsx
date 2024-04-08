import React from 'react';
import { Box, Grid } from '@mui/material';
import useSetFieldValues from './useSetFieldValues';
import RenderInputField from '../../rendertypeOfFieldUtils/RenderInputField';
import RenderAddressFields from '../../rendertypeOfFieldUtils/RenderAddressFields';

function RenderCounterPartyOrgInfo({ item, fieldDetails }) {
  useSetFieldValues(fieldDetails);

  return (
    <>
      {item === 'registeredNameMandatory' && (
        <Grid xs={12} sm={12} md={12} sx={{ mt: 2, p: 1 }}>
          <RenderInputField
            fieldDetails={{
              id: `${fieldDetails.id}.registeredName`,
              placeholder: 'Enter registered name*',
              label: 'Registered name*',
            }}
          />
        </Grid>
      )}
      {item === 'jurisdictionMandatory' && (
        <Grid xs={12} sm={12} md={12} sx={{ mt: 2, p: 1 }}>
          <RenderInputField
            fieldDetails={{
              id: `${fieldDetails.id}.jurisdiction`,
              placeholder: 'Jurisdiction*',
              label: 'Jurisdiction*',
            }}
          />
        </Grid>
      )}

      {item === 'addressMandatory' && (
        <Grid xs={12} sm={12} md={12} sx={{ mt: 2, p: 1 }}>
          <RenderAddressFields
            fieldDetails={{ ...fieldDetails, id: `${fieldDetails.id}.companyAddress` }}
          />
        </Grid>
      )}

      {/* will be done later */}
      {item === 'mobileMandatory' && <RenderAddressFields fieldDetails={fieldDetails} />}
    </>
  );
}

export default RenderCounterPartyOrgInfo;
