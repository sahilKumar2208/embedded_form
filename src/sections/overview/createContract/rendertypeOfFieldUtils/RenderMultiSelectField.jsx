import { RHFAutocomplete } from 'src/components/hook-form';

export default function RenderMultiSelectField({ otherPartyMode, control, fieldDetails }) {
  console.log('multipleselect is called');
  return (
    <>
      <RHFAutocomplete
        disabled={otherPartyMode}
        name={`${fieldDetails.id}`}
        label={`${fieldDetails.label} ${fieldDetails.isMandatory ? '*' : ''}`}
        multiple
        freeSolo
        options={fieldDetails.options?.map((option) => option.value)}
        ChipProps={{ size: 'small' }}
      />
    </>
  );
}
