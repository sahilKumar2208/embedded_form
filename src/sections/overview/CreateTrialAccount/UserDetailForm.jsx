import { Grid } from '@mui/material';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';

export const UserDetailForm = ({ levelIndex, userGroups }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <RHFTextField
            name={`otherUsers.${levelIndex}.userName`}
            label="User Name"
            placeholder="User Name"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <RHFTextField
            name={`otherUsers.${levelIndex}.userEmail`}
            label="User Email"
            placeholder="User Email"
          />
        </Grid>
        {userGroups && userGroups.length > 0 && (
          <Grid item xs={12} sm={12} md={12}>
            <RHFAutocomplete
              name={`otherUsers.${levelIndex}.userGroup`}
              label="User Groups"
              placeholder="User Groups"
              multiple
              options={userGroups}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option?.value === value?.value}
              ChipProps={{ size: 'small' }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};
