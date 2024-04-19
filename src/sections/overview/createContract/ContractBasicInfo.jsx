import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { updateContractTitle } from 'src/redux/slices/contractFormSlice';
import { useDispatch, useSelector } from 'react-redux';
import EntitySelectionFiled from './renderEntity/EntitySelectionField';
import { FormProvider, useForm } from 'react-hook-form';

function ContractBasicInfo({ orgFeatures, onNext, template }) {
  const methods = useForm({});
  const dispatch = useDispatch();
  const contractBasicInfo = useSelector((state) => state.form);
  console.log(contractBasicInfo, 'contractBasicInfo'); // Update the selector to target the 'form' slice
  const handleSubmit = () => {
    // Perform any necessary validation here
    // If validation passes, proceed to the next step
    onNext();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('nameee', e.target.name, e.target.value);
    if (name === 'contractTitle') {
      dispatch(updateContractTitle({ value: value }));
    } else if (name === 'contractDescription') {
      dispatch(updateContractDescription({ value: value }));
    }
  };

  const getAllUsers = () => {};

  const { control, watch, setValue, reset } = methods;
  console.log(watch(), 'jenjfbvjn');

  return (
    <div>
      <FormProvider {...methods}>
        <TextField
          label="Contract Name"
          name="contractTitle"
          variant="outlined"
          value={contractBasicInfo.contractTitle}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        {/* <TextField
          label="Contract Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
        /> */}
        {orgFeatures && (
          <EntitySelectionFiled
            getAllUsers={getAllUsers}
            orgFeatures={orgFeatures}
            template={template}
            methods={methods}
          />
        )}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Next
        </Button>
      </FormProvider>
    </div>
  );
}

export default ContractBasicInfo;
