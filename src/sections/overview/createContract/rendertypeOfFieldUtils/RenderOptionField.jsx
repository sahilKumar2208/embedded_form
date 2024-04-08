import { MenuItem } from '@mui/material';
import { RHFSelect } from 'src/components/hook-form';

export default function RenderOptionField({ otherPartyMode, control, fieldDetails }) {
  if (fieldDetails.type === 'boolean') {
    return (
      <RHFSelect
        fullWidth
        disabled={otherPartyMode}
        name={fieldDetails.id}
        label={`${fieldDetails.label} ${fieldDetails.isMandatory ? '*' : ''}`}
        InputLabelProps={{ shrink: true }}
      >
        <MenuItem value={'Yes'}>{'Yes'}</MenuItem>
        <MenuItem value={'No'}>{'No'}</MenuItem>
      </RHFSelect>
    );
  }
  return (
    <RHFSelect
      fullWidth
      disabled={otherPartyMode}
      name={fieldDetails.id}
      label={`${fieldDetails.label} ${fieldDetails.isMandatory ? '*' : ''}`}
      InputLabelProps={{ shrink: true }}
      // defaultValue ={fieldDetails.defaultValue}
    >
      {fieldDetails.options?.map((option) => (
        <MenuItem sx={{ textTransform: 'none' }} key={option.value} value={option.value}>
          {option.value}
        </MenuItem>
      ))}
    </RHFSelect>
  );
}
