import React from 'react';
import { Grid } from '@mui/material';
import useSetFieldValues from './useSetFieldValues';
import RenderInputField from '../../rendertypeOfFieldUtils/RenderInputField';
import RenderAddressFields from '../../rendertypeOfFieldUtils/RenderAddressFields';

function RenderCounterPartyIndividualInfo({ item, fieldDetails }) {
  // sets the subfield value of a big object in ui
  useSetFieldValues(fieldDetails);
  console.log(fieldDetails.id, 'fieldDetails.idsss');

  return (
    <>
      {item === 'fullNameMandatory' && (
        <Grid xs={12} sm={12} md={12} sx={{ mt: 2, p: 1 }}>
          <RenderInputField
            fieldDetails={{
              id: `${fieldDetails.id}.fullName`,
              placeholder: 'Enter your full name*',
              label: 'Full name*',
            }}
          />
        </Grid>
      )}
      {item === 'firstNameMandatory' && (
        <Grid xs={12} sm={12} md={12} sx={{ mt: 2, p: 1 }}>
          <RenderInputField
            fieldDetails={{
              id: `${fieldDetails.id}.firstName`,
              placeholder: 'Enter your first name*',
              label: 'First name*',
            }}
          />
        </Grid>
      )}
      {item === 'lastNameMandatory' && (
        <Grid xs={12} sm={12} md={12} sx={{ mt: 2, p: 1 }}>
          <RenderInputField
            fieldDetails={{
              id: `${fieldDetails.id}.lastName`,
              placeholder: 'Enter your last name*',
              label: 'Last name*',
            }}
          />
        </Grid>
      )}
      {item === 'emailMandatory' && (
        <Grid xs={12} sm={12} md={12} sx={{ mt: 2, p: 1 }}>
          <RenderInputField
            fieldDetails={{
              id: `${fieldDetails.id}.email`,
              placeholder: 'Enter your email*',
              label: 'Your email*',
            }}
          />
        </Grid>
      )}
      {item === 'jobTitleMandatory' && (
        <Grid xs={12} sm={12} md={12} sx={{ mt: 2, p: 1 }}>
          <RenderInputField
            fieldDetails={{
              id: `${fieldDetails.id}.jobTitle`,
              placeholder: 'Enter your job title*',
              label: 'Your job title*',
            }}
          />
        </Grid>
      )}
      {item === 'addressMandatory' && (
        <Grid xs={12} sm={12} md={12} sx={{ mt: 1, p: 1 }}>
          <RenderAddressFields
            fieldDetails={{ ...fieldDetails, id: `${fieldDetails.id}.address` }}
          />
        </Grid>
      )}
      {item === 'mobileMandatory' && <RenderInputField fieldDetails={fieldDetails} />}
    </>
  );
}

export default RenderCounterPartyIndividualInfo;
