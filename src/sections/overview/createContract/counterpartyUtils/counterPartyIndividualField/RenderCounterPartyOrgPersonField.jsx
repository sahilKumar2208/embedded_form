import React, { useEffect, useState } from 'react';
import { Card, Grid } from '@mui/material';
import { RHFAutocomplete } from 'src/components/hook-form';
import axiosInstance from 'src/utils/axios';
import { useFormContext } from 'react-hook-form';
import RenderCounterPartyOrgPersonInfo from './RenderCounterPartyOrgPersonInfo';
import colorArray from 'src/utils/colorArray';
import _ from 'lodash';
import useClearFieldErrors from './useClearFieldErrors';
import axios from 'axios';

function RenderCounterPartyOrgPersonField({
  otherPartyMode,
  control,
  fieldDetails,
  counterParties,
}) {
  console.log(fieldDetails, 'sssssss')
  const [counterparties, setCounterparties] = useState([]);
  const { counterpartyOrgPersonMandatoryFields } = fieldDetails;
  const [fields, setFields] = useState([]);
  const [flag, setFlag] = useState(true);

  const {
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const arr = [];
    for (let key in counterpartyOrgPersonMandatoryFields) {
      if (counterpartyOrgPersonMandatoryFields[key] && key !== '_id') {
        arr.push(key);
      }
    }
    setFields(arr.length === 0 ? ['fullNameMandatory', 'emailMandatory'] : arr);
  }, []);

    console.log('pooraaa 22222 watch', watch(), fieldDetails);


  const fetchCounterparties = async () => {
    //fetches pocs based on org
    // let cpartiesData = await axiosInstance.get(
    //   `/thirdPartyUsers/pocsBasedOnRegisteredName/${
    //     watch(fieldDetails.counterpartyOrgFieldId).registeredName
    //   }`
    // );
    console.log(
      'qwwwwwwwww',
      fieldDetails.counterpartyOrgFieldId,
      watch(fieldDetails.counterpartyOrgFieldId).registeredName
    );

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://cmt-backend-playground.intellosync.com/api/v1/thirdPartyUsers/pocsBasedOnRegisteredName/${
        watch(fieldDetails.counterpartyOrgFieldId).registeredName
      }`,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMzUwNzAwNywiZXhwIjoxNzEzNTkzNDA3fQ.2pCtPkvoM2QKms3IDV0hdiqK95weWHzUxAXkLpdJ5H0',
      },
    };

    try {
      const cpartiesData = await axios.request(config);
      console.log('POCCCCC ', cpartiesData.data);

      const cpartiesArray = cpartiesData.data.map((res) => {
        return {
          fullName: res.fullName,
          email: res.email,
          jobTitle: res.jobTitle,
          address: res.address,
          firstName: res.firstName,
          lastName: res.lastName,
          userId: res._id,
        };
      });

      setCounterparties(cpartiesArray);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch POC');
    }

    // if (flag) {
    //   if (
    //     !_.isEmpty(contractState) &&
    //     contractState?.fieldsDefaultValues &&
    //     contractState?.fieldsDefaultValues?.length !== 0
    //   ) {
    //     const obj = contractState.fieldsDefaultValues[panelIndex];
    //     setValue(fieldDetails.id, obj[fieldDetails.id]);
    //     setError(fieldDetails.id, null);
    //     setFlag(false);
    //   }

    //   if (!_.isEmpty(editFormDefaultValues)) {
    //     setValue(fieldDetails.id, editFormDefaultValues[fieldDetails.id]);
    //     setError(fieldDetails.id, null);
    //     setFlag(false);
    //   }
    // }
  };

  // counterParties checks wheather the contract party is changed or not
  useEffect(() => {
    console.log('org id innnnnnnnnnn', watch(fieldDetails.counterpartyOrgFieldId));
    if (watch(fieldDetails.counterpartyOrgFieldId)) {
      fetchCounterparties();
    }
    if (watch(fieldDetails.id)) {
      const parentElement = document.getElementById(fieldDetails.id);
      let clearIcon;
      if (parentElement) {
        clearIcon = parentElement.querySelector('.MuiAutocomplete-clearIndicator');
      }
      if (clearIcon) {
        clearIcon.click();
      }
    }
  }, [counterParties, watch(fieldDetails.counterpartyOrgFieldId)]);

  //clears the error in auto while change of the subfield
  useClearFieldErrors(fieldDetails);

  return (
    <>
      {watch(fieldDetails.counterpartyOrgFieldId) && (
        // <Card
        //   sx={{
        //     width: "100%",
        // border: `1px solid ${colorArray[(Math.floor(Math.random() * 10) + 1) % 30]}`,
        //     mt: 1,
        //     p: 1,
        //   }}
        // >
        <Grid container>
          <Grid id={fieldDetails.id} xs={12} sm={12} md={12}>
            <RHFAutocomplete
              name={`${fieldDetails.id}`}
              label={`Choose point of contact*`}
              // multiple
              // freeSolo
              options={counterparties}
              getOptionLabel={(option) => option.fullName}
              // isOptionEqualToValue={(option, value) => option._id ===  value._id}
              ChipProps={{ size: 'small' }}
            />
          </Grid>
          {watch(fieldDetails.id) &&
            fields.map((item) => {
              return <RenderCounterPartyOrgPersonInfo item={item} fieldDetails={fieldDetails} />;
            })}
        </Grid>
        // </Card>
      )}
    </>
  );
}

export default RenderCounterPartyOrgPersonField;
