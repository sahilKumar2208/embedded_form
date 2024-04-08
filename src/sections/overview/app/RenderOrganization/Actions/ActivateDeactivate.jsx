import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { SplashScreen } from 'src/components/loading-screen';

export const ActivateDeactivate = (props) => {
  const { organization, handleChange, loading } = props;

  return (
    <>
      <ToggleButtonGroup
        color={
          organization?.isDeleted === null
            ? 'default'
            : organization?.isDeleted
              ? 'error'
              : 'primary'
        }
        value={organization?.isDeleted ? 'Deactivate' : 'Activate'}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        size="small"
      >
        <ToggleButton value="Activate">Activate</ToggleButton>
        <ToggleButton value="Deactivate">Deactivate</ToggleButton>
      </ToggleButtonGroup>
      {loading && <SplashScreen />}
    </>
  );
};
