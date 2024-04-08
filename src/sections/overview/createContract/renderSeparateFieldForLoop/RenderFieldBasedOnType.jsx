import React from 'react';
import RenderOptionField from '../rendertypeOfFieldUtils/RenderOptionField';
import RenderMonetaryFields from '../rendertypeOfFieldUtils/RenderMonetaryFields';
import RenderAddressFields from '../rendertypeOfFieldUtils/RenderAddressFields';
import RenderMultiSelectField from '../rendertypeOfFieldUtils/RenderMultiSelectField';
import RenderDateField from '../rendertypeOfFieldUtils/RenderDateField';
import RenderPhoneField from '../rendertypeOfFieldUtils/RenderPhoneField';
import RenderDurationField from '../rendertypeOfFieldUtils/RenderDurationField';
import RenderInputField from '../rendertypeOfFieldUtils/RenderInputField';

function RenderFieldBasedOnType({ otherPartyMode, fieldDetails, control, attributeValueMap }) {
  if (fieldDetails.type === 'options' || fieldDetails.type === 'boolean') {
    return (
      <RenderOptionField
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
  if (fieldDetails.type === 'address') {
    return (
      <RenderAddressFields
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
  if (fieldDetails.type === 'date') {
    return (
      <RenderDateField
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
  if (fieldDetails.type === 'duration') {
    return (
      <RenderDurationField
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
    fieldDetails.type === 'paragraph'
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
}

export default RenderFieldBasedOnType;
