import React, { useEffect, useState } from 'react';
import { Card, Grid } from '@mui/material';
import { RHFAutocomplete } from 'src/components/hook-form';
import axiosInstance from 'src/utils/axios';
import { useFormContext } from 'react-hook-form';
import RenderCounterPartyOrgInfo from './RenderCounterPartyOrgInfo';
import colorArray from 'src/utils/colorArray';
import useClearFieldErrors from './useClearFieldErrors';
import RenderCounterpartyOrgUi from './RenderCounterpartyOrgUi';

function RenderCounterPartyOrgField({
  otherPartyMode,
  control,
  fieldDetails,
  //checks whether counterparties changed or not
  counterParties,
}) {
  const [counterparties, setCounterparties] = useState([]);

  const { counterpartyOrgMandatoryFields } = fieldDetails;
  const [fields, setFields] = useState([]);

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const arr = [];
    for (let key in counterpartyOrgMandatoryFields) {
      if (counterpartyOrgMandatoryFields[key] && key !== '_id') {
        arr.push(key);
      }
    }
    setFields(arr.length === 0 ? ['registeredNameMandatory'] : arr);
  }, []);

  useEffect(() => {
    if (watch(fieldDetails.id)) {
      setValue(`${fieldDetails.id}.companyAddress`, watch(`${fieldDetails.id}.companyAddress`));
      setValue(`${fieldDetails.id}.registeredName`, watch(`${fieldDetails.id}.registeredName`));
      setValue(`${fieldDetails.id}.jurisdiction`, watch(`${fieldDetails.id}.jurisdiction`));
    }
  }, [watch(fieldDetails.id)]);

  const fetchCounterparties = async () => {
    const cpartiesData = await axiosInstance.get(
      '/thirdPartyUsers/all/counterparties?type=Organization'
    );

    setCounterparties(
      cpartiesData.data.map((res) => {
        return {
          companyAddress: res.companyAddress,
          registeredName: res.registeredName,
          jurisdiction: res.jurisdiction,
          orgId: res._id,
        };
      })
    );
  };

  // counterParties checks wheather the contract party is changed or not
  useEffect(() => {
    fetchCounterparties();
  }, [counterParties]);

  //clears the error in auto while change of the subfield
  useClearFieldErrors(fieldDetails);

  return (
    // <Card
    //   sx={{
    //     width: "100%",
    // border: `1px solid ${colorArray[(Math.floor(Math.random() * 10) + 1) % 30]}`,
    //     mt: 1,
    //     p: 1,
    //   }}
    // >
    <RenderCounterpartyOrgUi
      fields={fields}
      fieldDetails={fieldDetails}
      counterparties={counterparties}
    />
    // <Grid container>
    //   <Grid xs={12} sm={12} md={12}>
    //     <Item>
    //       <RHFAutocomplete
    //         name={`${fieldDetails.id}`}
    //         label={`Choose Counterparty(Organization)*`}
    //         // multiple
    //         // freeSolo
    //         options={counterparties}
    //         getOptionLabel={(option) => option.registeredName}
    //         // isOptionEqualToValue={(option, value) => option._id === value._id}
    //         ChipProps={{ size: "small" }}
    //       />
    //     </Item>
    //   </Grid>
    //   {watch(fieldDetails.id) &&
    //     fields.map((item) => {
    //       return <RenderCounterPartyOrgInfo item={item} fieldDetails={fieldDetails} />;
    //     })}
    // </Grid>
    // </Card>
  );
}

export default RenderCounterPartyOrgField;
