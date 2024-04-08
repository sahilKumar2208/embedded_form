import { Button, Grid, MenuItem, Tooltip, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { RHFMultiCheckbox, RHFSelect } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormProvider from 'src/components/hook-form/form-provider';

const schema = yup.object({
  counterPartyType: yup.string().required('No option is selected'),
});

const SelectTypeOfCounterParty = ({ onNext, setTypeOfCounterParty }) => {
  const methods = useForm({
    defaultValues: {
      counterPartyType: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data, 'data');
    setTypeOfCounterParty(data.counterPartyType);
    onNext();
  };

  return (
    <>
      <FormProvider methods={methods}>
        <Grid container sx={{ p: 1, mt: 2 }}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography align="center" variant="subtitle" sx={{ flexGrow: 1 }}>
              Select the type of CounterParty that you want to add.
            </Typography>
            <Tooltip
              title="Choose Type of CounterParty User That you want to add"
              placement="top-end"
            >
              <span>
                {/* <RHFMultiCheckbox
                  name="counterPartyType"
                  options={[
                    { label: "Organization", value: "Org" },
                    { label: "Individual", value: "Individual" },
                  ]}
                  sx={{ width: 1 }}
                /> */}
                <RHFSelect
                  fullWidth
                  name={'counterPartyType'}
                  label="Choose Type Of Counter Party*"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mt: 2 }}
                >
                  <MenuItem key="Organization" value="Organization">
                    Organization
                  </MenuItem>
                  <MenuItem key="Individual" value="Individual">
                    Individual
                  </MenuItem>
                </RHFSelect>
              </span>
            </Tooltip>
          </Grid>

          <Grid item m={12} xs={12} sm={12} md={12}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:cloud-upload-fill" />}
              onClick={methods.handleSubmit(onSubmit)}
              sx={{ width: '100%' }}
            >
              {' '}
              Next{' '}
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default SelectTypeOfCounterParty;
