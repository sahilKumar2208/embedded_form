import { Typography } from '@mui/material';
import RenderSeparateField from './renderSeparateFieldForLoop/RenderSeparateField';
import RenderDurationField from './rendertypeOfFieldUtils/RenderDurationField';
import RenderPhoneField from './rendertypeOfFieldUtils/RenderPhoneField';
import RenderDateField from './rendertypeOfFieldUtils/RenderDateField';
import RenderInputField from './rendertypeOfFieldUtils/RenderInputField';
import RenderOptionField from './rendertypeOfFieldUtils/RenderOptionField';
import RenderMultiSelectField from './rendertypeOfFieldUtils/RenderMultiSelectField';
import RenderAddressFields from './rendertypeOfFieldUtils/RenderAddressFields';
import RenderMonetaryFields from './rendertypeOfFieldUtils/RenderMonetaryFields';
import RenderCounterPartyOrgField from './counterpartyUtils/counterPartyIndividualField/RenderCounterPartyOrgField';
import RenderCounterPartyOrgPersonField from './counterpartyUtils/counterPartyIndividualField/RenderCounterPartyOrgPersonField';
import RenderCounterPartyIndividualField from './counterpartyUtils/counterPartyIndividualField/RenderCounterPartyIndividualField';

export default function RenderField({
  otherPartyMode = false,
  fieldDetails,
  control,
  counterParties,
  attributeValueMap,
}) {
  if (fieldDetails.value == null) {
    fieldDetails.value = '';
  }
  // if (fieldDetails.type === 'counterpartyOrg') {
  //   return (
  //     <RenderCounterPartyOrgField
  //       counterParties={counterParties}
  //       otherPartyMode={otherPartyMode}
  //       fieldDetails={fieldDetails}
  //       control={control}
  //     />
  //   );
  // }

  if (fieldDetails.type === 'counterpartyOrgPerson') {
    return (
      <RenderCounterPartyOrgPersonField
        counterParties={counterParties}
        otherPartyMode={otherPartyMode}
        fieldDetails={fieldDetails}
        control={control}
      />
    );
  }
  if (fieldDetails.type === 'counterpartyIndividual') {
    return (
      <RenderCounterPartyIndividualField
        counterParties={counterParties}
        otherPartyMode={otherPartyMode}
        fieldDetails={fieldDetails}
        control={control}
        attributeValueMap={attributeValueMap}
      />
    );
  }

  if (
    (fieldDetails.listId || fieldDetails.tableId) &&
    (fieldDetails.type === 'boolean' ||
      fieldDetails.type === 'options' ||
      fieldDetails.type === 'date' ||
      fieldDetails.type === 'phone' ||
      fieldDetails.type === 'duration' ||
      fieldDetails.type === 'number' ||
      fieldDetails.type === 'string' ||
      fieldDetails.type === 'email' ||
      fieldDetails.type === 'text' ||
      fieldDetails.type === 'paragraph' ||
      fieldDetails.type === 'multiSelect' ||
      fieldDetails.type === 'address' ||
      fieldDetails.type === 'monetary')
  ) {
    return (
      <RenderSeparateField
        otherPartyMode={otherPartyMode}
        fieldDetails={fieldDetails}
        control={control}
        attributeValueMap={attributeValueMap}
      />
    );
  }

  if (fieldDetails.type === 'duration') {
    console.log(fieldDetails.listId, 'mmmmmmmmmmmmmmmmmmmmmm');
    return (
      <RenderDurationField
        otherPartyMode={otherPartyMode}
        fieldDetails={fieldDetails}
        control={control}
      />
    );
  }
  if (fieldDetails.type === 'phone') {
    return (
      <RenderPhoneField
        otherPartyMode={otherPartyMode}
        fieldDetails={fieldDetails}
        control={control}
      />
    );
  }

  if (fieldDetails.type === 'date') {
    return (
      <RenderDateField
        otherPartyMode={otherPartyMode}
        fieldDetails={fieldDetails}
        control={control}
      />
    );
  }

  if (
    fieldDetails.type === 'number' ||
    fieldDetails.type === 'string' ||
    fieldDetails.type === 'email' ||
    fieldDetails.type === 'text' ||
    fieldDetails.type === 'paragraph' ||
    fieldDetails.type === 'entity' ||
    fieldDetails.type === 'entitySignatoryPerson'
  ) {
    return (
      <RenderInputField
        otherPartyMode={otherPartyMode}
        fieldDetails={fieldDetails}
        control={control}
        multiline={fieldDetails.type === 'paragraph' ? true : false}
        attributeValueMap={attributeValueMap}
      />
    );
  }

  if (fieldDetails.type === 'options' || fieldDetails.type === 'boolean') {
    return (
      <RenderOptionField
        otherPartyMode={otherPartyMode}
        fieldDetails={fieldDetails}
        control={control}
      />
    );
  }

  if (fieldDetails.type === 'multiSelect') {
    return (
      <RenderMultiSelectField
        otherPartyMode={otherPartyMode}
        fieldDetails={fieldDetails}
        control={control}
      />
    );
  }
  if (fieldDetails.type === 'address') {
    return (
      <RenderAddressFields
        otherPartyMode={otherPartyMode}
        fieldDetails={fieldDetails}
        control={control}
      />
    );
  }
  if (fieldDetails.type === 'monetary') {
    return (
      <RenderMonetaryFields
        otherPartyMode={otherPartyMode}
        fieldDetails={fieldDetails}
        control={control}
      />
    );
  }

  return (
    <>
      <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
        <label>{fieldDetails.label}</label>
      </Typography>
      <div>{fieldDetails.type}</div>
    </>
  );
}
