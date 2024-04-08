import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import useSetFieldValues from './useSetFieldValues';
import RenderAddressFields from '../../rendertypeOfFieldUtils/RenderAddressFields';
import RenderInputField from '../../rendertypeOfFieldUtils/RenderInputField';

function RenderCounterPartyOrgPersonInfo({ item, fieldDetails }) {
  // const { setValue, watch } = useFormContext();
  // useEffect(() => {
  //   setValue(
  //     `${fieldDetails.id}.fullName`,
  //     watch(fieldDetails.id) && watch(fieldDetails.id).fullName
  //   );
  //   setValue(
  //     `${fieldDetails.id}.firstName`,
  //     watch(fieldDetails.id) && watch(fieldDetails.id).firstName
  //   );
  //   setValue(
  //     `${fieldDetails.id}.lastName`,
  //     watch(fieldDetails.id) && watch(fieldDetails.id).lastName
  //   );
  //   setValue(
  //     `${fieldDetails.id}.jobTitle`,
  //     watch(fieldDetails.id) && watch(fieldDetails.id).jobTitle
  //   );
  //   setValue(
  //     `${fieldDetails.id}.address`,
  //     watch(fieldDetails.id) && watch(fieldDetails.id).address
  //   );
  //   setValue(`${fieldDetails.id}.email`, watch(fieldDetails.id) && watch(fieldDetails.id).email);
  // }, [watch(fieldDetails.id)]);

  // sets the subfield value of a big object in ui
  useSetFieldValues(fieldDetails);

  return (
    <>
      {item === 'fullNameMandatory' && (
        <Grid xs={12} sm={12} md={12} sx={{ mt: 2, p: 1 }}>
          <RenderInputField
            fieldDetails={{
              id: `${fieldDetails.id}.fullName`,
              placeholder: 'Enter your full name',
              label: 'Full name*',
            }}
          />
        </Grid>
      )}
      {item === 'emailMandatory' && (
        <Grid xs={12} sm={12} md={12} sx={{ mt: 2, p: 1 }}>
          <RenderInputField
            fieldDetails={{
              id: `${fieldDetails.id}.email`,
              placeholder: 'Email*',
              label: 'Email*',
            }}
          />
        </Grid>
      )}
      {item === 'jobTitleMandatory' && (
        <Grid xs={12} sm={12} md={12} sx={{ mt: 2, p: 1 }}>
          <RenderInputField
            fieldDetails={{
              id: `${fieldDetails.id}.jobTitle`,
              placeholder: 'Job title*',
              label: 'Job title*',
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

      {/* will be done later */}
      {item === 'mobileMandatory' && <RenderAddressFields fieldDetails={fieldDetails} />}
    </>
  );
}

export default RenderCounterPartyOrgPersonInfo;
