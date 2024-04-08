import { RHFTextField } from 'src/components/hook-form';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function RenderInputField({
  otherPartyMode,
  control,
  fieldDetails,
  multiline,
  attributeValueMap,
}) {
  // const panelIndex = useSelector((state) => state.contract.panelIndex);
  // const contractState = useSelector((state) => state.contract);
  const { setValue } = useFormContext();

  // useEffect(() => {
    // console.log(fieldDetails, attributeValueMap[`${fieldDetails.id}`], 'fieldDetails------');

  //   if (attributeValueMap[`${fieldDetails.id}`])
  //     setValue(fieldDetails.id, attributeValueMap[`${fieldDetails.id}`]);
  // }, []);

  console.log('attribute kaa value ????', attributeValueMap);

  // useEffect(() =>{
  //   console.log(fieldDetails.defaultValue, 'feilddetails.defaulvalues')
  //   setValue(fieldDetails.id, fieldDetails.defaultValue)
  //   console.log(panelIndex, contractState.fieldsDefaultValues[panelIndex], 'hello there how are you d')
  //   if(contractState.fieldsDefaultValues[panelIndex][fieldDetails.id]){
  //     setValue(fieldDetails.id, contractState.fieldsDefaultValues[panelIndex][fieldDetails.id])
  //   }
  // },[])
  return (
    <RHFTextField
      disabled={
        otherPartyMode ||
        fieldDetails.type === 'entity' ||
        fieldDetails.type === 'entitySignatoryPerson'
      }
      multiline={multiline}
      rows={multiline ? 4 : 1}
      size="medium"
      placeholder={fieldDetails.placeholder}
      name={fieldDetails.id}
      // defaultValue = {fieldDetails.defaultValue}
      label={`${fieldDetails.label} ${
        fieldDetails.isMandatory &&
        (fieldDetails.defaultValue === null ||
          fieldDetails.defaultValue === undefined ||
          fieldDetails.type === 'phone' ||
          fieldDetails.type === 'email' ||
          fieldDetails.type === 'number')
          ? '*'
          : ''
      }`}
      InputLabelProps={{ shrink: true }}
    />
  );
}
