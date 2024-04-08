import { Divider, Drawer, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify';
import CounterPartyInfoForm from './CounterPartyInfoForm';
import SelectTypeOfCounterParty from './SelectTypeOfCounterParty';

const CounterPartyAdditionDrawer = ({
  open,
  setIsCounterPartyAdditionDrawerOpen,
  setCounterParties,
  counterParties,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [typeOfCounterParty, setTypeOfCounterParty] = useState(null);

  const onClose = () => {
    setIsCounterPartyAdditionDrawerOpen(false);
  };

  const handleNext = () => {
    const currStep = currentStep;
    setCurrentStep(currStep + 1);
  };

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 1, pr: 1, pl: 2.5 }}
    >
      <Typography align="center" variant="h6" sx={{ flexGrow: 1 }}>
        Add Counter Party
      </Typography>
      <IconButton onClick={onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  useEffect(() => {
    setCurrentStep(0);
  }, [open]);

  console.log(typeOfCounterParty, 'typeOfCounterParty');

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: { width: 500 },
      }}
    >
      {renderHead}
      <Divider />
      {currentStep === 0 ? (
        <SelectTypeOfCounterParty
          setTypeOfCounterParty={setTypeOfCounterParty}
          onNext={handleNext}
        />
      ) : (
        <CounterPartyInfoForm
          setCounterParties={setCounterParties}
          counterParties={counterParties}
          typeOfCounterParty={typeOfCounterParty}
          setCurrentStep={setCurrentStep}
          onClose={onClose}
        />
      )}
    </Drawer>
  );
};

export default CounterPartyAdditionDrawer;
