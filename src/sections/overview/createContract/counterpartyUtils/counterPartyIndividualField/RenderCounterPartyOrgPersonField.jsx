import React, { useEffect, useState } from 'react';
import { Card, Grid } from '@mui/material';
import { RHFAutocomplete } from 'src/components/hook-form';
import axiosInstance from 'src/utils/axios';
import { useFormContext } from 'react-hook-form';
// import { useSelector } from 'react-redux';
import RenderCounterPartyOrgPersonInfo from './RenderCounterPartyOrgPersonInfo';
import _ from 'lodash';
import useClearFieldErrors from './useClearFieldErrors';
import axios from 'axios';

function RenderCounterPartyOrgPersonField({
  otherPartyMode,
  control,
  fieldDetails,
  counterParties,
}) {
  const [counterparties, setCounterparties] = useState([]);
  const { counterpartyOrgPersonMandatoryFields } = fieldDetails;
  const [fields, setFields] = useState([]);
  // const contractState = useSelector((state) => state.contract);
  // const { panelIndex, editFormDefaultValues } = contractState;
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

  // const fetchCounterparties = async () => {
  //   //fetches pocs based on org
  //   let cpartiesData = await axiosInstance.get(
  //     `/thirdPartyUsers/pocsBasedOnRegisteredName/${
  //       watch(fieldDetails.counterpartyOrgFieldId).registeredName
  //     }`
  //   );

  //   const cpartiesArray = cpartiesData.data?.map((res) => {
  //     return {
  //       fullName: res.fullName,
  //       email: res.email,
  //       jobTitle: res.jobTitle,
  //       address: res.address,
  //       firstName: res.firstName,
  //       lastName: res.lastName,
  //       userId: res._id,
  //     };
  //   });

  //   setCounterparties(cpartiesArray);
  //   // if (flag) {
  //   //   if (
  //   //     !_.isEmpty(contractState) &&
  //   //     contractState?.fieldsDefaultValues &&
  //   //     contractState?.fieldsDefaultValues?.length !== 0
  //   //   ) {
  //   //     const obj = contractState.fieldsDefaultValues[panelIndex];
  //   //     setValue(fieldDetails.id, obj[fieldDetails.id]);
  //   //     setError(fieldDetails.id, null);
  //   //     setFlag(false);
  //   //   }

  //   //   if (!_.isEmpty(editFormDefaultValues)) {
  //   //     setValue(fieldDetails.id, editFormDefaultValues[fieldDetails.id]);
  //   //     setError(fieldDetails.id, null);
  //   //     setFlag(false);
  //   //   }
  //   // }
  // };

  // fetchCounterParties
  async function fetchCounterparties() {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://cmt-backend-playground.intellosync.com/api/v1/thirdPartyUsers/all/counterparties?type=IndependentIndividual',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMjUyMjk1MCwiZXhwIjoxNzEyNjA5MzUwfQ.sr7l5lR9KuKjsTPXQnLDOGkzYeEVnlmRtT0on9mJ7D8',
      },
    };

    try {
      const response = await axios.request(config);
      console.log('get counterparties 333333 ', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch counterparties');
    }
  }

  useEffect(() => {
    const getCounterparties = async () => {
      try {
        const counterparties = await fetchCounterparties();
        console.log('counterparties wala data iss --->', counterparties);
        const cpartiesArray = counterparties?.data?.map((res) => {
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
        console.log('capital wala counterparty', counterparties);
      } catch (error) {
        console.log('error in fetching counter parties', error);
      }
    };
    getCounterparties();
  }, []);

  // counterParties checks wheather the contract party is changed or not
  useEffect(() => {
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
          <Grid item id={fieldDetails.id} xs={12} sm={12} md={12}>
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
            fields?.map((item) => {
              return <RenderCounterPartyOrgPersonInfo item={item} fieldDetails={fieldDetails} />;
            })}
        </Grid>
        // </Card>
      )}
    </>
  );
}

export default RenderCounterPartyOrgPersonField;
