import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  MobileStepper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import jurisdictionsList from './JurisDictionList';
import Iconify from 'src/components/iconify';
import axiosInstance from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import RenderAddressFields from '../../rendertypeOfFieldUtils/RenderAddressFields';

const OrgCounterPartyForm = ({
  setCurrentStep,
  setCounterParties,
  counterParties,
  onClose,
  isSubmitting,
  setIsSubmitting,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const initialSchema = yup.object().shape({
    registeredName: yup.string().required('Registered Name is Required'),
    jurisdiction: yup.string().required('Jurisdiction is Required'),
    orgAddress: yup.object().shape({
      addressLine1: yup.string(),
      city: yup.string().required('City is required'),
      state: yup.string(),
      postCode: yup
        .mixed()
        .test('is-valid-value', 'Please Enter a valid zip/post code', (value) => {
          return (
            value === undefined || value === '' || value === null || /^\d{5,10}$/.test(value.trim())
          );
        })
        .nullable(),
      country: yup.string().required('Country is required'),
    }),
  });
  const [schema, setSchema] = useState(initialSchema);

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { watch, setValue } = methods;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 1) {
      const firstName = watch('firstName') ? watch('firstName') : '';
      const middleName = watch('middleName') ? watch('middleName') : '';
      const lastName = watch('lastName') ? watch('lastName') : '';
      const fullName = `${firstName}${middleName ? ` ${middleName} ` : ' '}${lastName}`.trim();
      setValue('fullName', fullName);
    }
  }, [watch('firstName'), watch('lastName'), watch('middleName')]);

  const onSubmit = (data) => {
    console.log(data, 'data');

    if (step === 0) {
      const finalSchema = yup.object().shape({
        firstName: yup.string().required('First Name is Required'),
        fullName: yup.string().required('Full Name is Required'),
        email: yup.string().required('Email is required').email('Must be a valid email address'),
        // phoneNumber: yup.string().matches(/^[0-9()+\- ]+$/, "Invalid phone number"),
        jobTitle: yup.string(),
      });
      setSchema(finalSchema);
      setStep(1);
    } else {
      setIsSubmitting(true);
      axiosInstance
        .post('/thirdPartyUsers', { ...data, counterpartyType: 'Organization' })
        .then((res) => {
          setCounterParties([...counterParties, res.data]);
          setIsSubmitting(false);
          onClose();
          enqueueSnackbar('Counter Party created Successfully', { variant: 'success' });
        })
        .catch((err) => {
          setIsSubmitting(false);
          enqueueSnackbar('Some error occured', { variant: 'error' });
        });
    }
  };

  const handleBack = () => {
    if (step === 0) {
      setCurrentStep(0);
    } else {
      setSchema(initialSchema);
      setStep(0);
    }
  };

  console.log(watch(), 'formvaluesss');

  return (
    <>
      <MobileStepper
        variant="progress"
        steps={3}
        position="static"
        activeStep={step}
        sx={{
          justifyContent: 'center',
          '& .css-x7zk2-MuiLinearProgress-root-MuiMobileStepper-progress': {
            width: 1,
          },
          mt: 1,
        }}
      />
      <FormProvider methods={methods}>
        <Grid container spacing={2} sx={{ p: 1.5 }}>
          {step === 0 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, width: '100%' }}>
                <Typography variant={'subtitle1'}>Organization Details</Typography>
              </Box>
              <Grid item xs={12} sm={12} md={12}>
                <Tooltip title="Counter Party Organization Registered Name" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={'registeredName'}
                      label="Registered Name of the Organization*"
                      placeholder="Registered Name"
                      InputLabelProps={{ shrink: true }}
                    />{' '}
                  </span>
                </Tooltip>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Tooltip title="Counter Party Organization Jurisdiction" placement="top-end">
                  <span>
                    <RHFSelect
                      fullWidth
                      name={'jurisdiction'}
                      label="Jurisdiction of Organization*"
                      placeholder="Jurisdiction"
                      InputLabelProps={{ shrink: true }}
                      sx={{ mt: 2 }}
                    >
                      {jurisdictionsList.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </span>
                </Tooltip>
              </Grid>

              <div style={{ padding: '15px' }}>
                <RenderAddressFields
                  otherPartyMode={false}
                  fieldDetails={{ id: 'orgAddress', isComingFromCountryParty: true }}
                  labelText={'Permanent Address Of the Organization'}
                />
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, width: '100%' }}>
                <Typography variant={'subtitle1'}>Primary Contact Point Details</Typography>
              </Box>
              <Grid item xs={6} sm={6} md={6}>
                <Tooltip title="Contact Point First Name" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={'firstName'}
                      label="First name of Contact Point*"
                      placeholder="First Name"
                      InputLabelProps={{ shrink: true }}
                    />{' '}
                  </span>
                </Tooltip>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Tooltip title="Contact Point Middle Name" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={'middleName'}
                      label="Middle name of Contact Point"
                      placeholder="Middle Name"
                      InputLabelProps={{ shrink: true }}
                    />{' '}
                  </span>
                </Tooltip>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Tooltip title="Contact Point Last Name" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={'lastName'}
                      label="Last name of Contact Point"
                      placeholder="Last Name"
                      InputLabelProps={{ shrink: true }}
                    />{' '}
                  </span>
                </Tooltip>
              </Grid>
              {/* 
              <Grid item xs={6} sm={6} md={6}>
                <Tooltip title="Contact Point Individual Mobile Number" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={"phoneNumber"}
                      label="Mobile Number of Contact Point"
                      placeholder="Mobile Number"
                      InputLabelProps={{ shrink: true }}
                    />{" "}
                  </span>
                </Tooltip>
              </Grid> */}

              <Grid item xs={12} sm={12} md={12}>
                <Tooltip title="Contact Point Full Name" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={'fullName'}
                      label="Full name of Contact Point*"
                      placeholder="Full Name"
                      InputLabelProps={{ shrink: true }}
                    />{' '}
                  </span>
                </Tooltip>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Tooltip title="Email Id of the Contact Point Individual" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={'email'}
                      label="Contact Point Individual Email Id*"
                      placeholder="Email Id"
                      InputLabelProps={{ shrink: true }}
                    />{' '}
                  </span>
                </Tooltip>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Tooltip title="Contact Point Individual Job Title" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={'jobTitle'}
                      label="Job Title of Contact Point"
                      placeholder="Job Title"
                      InputLabelProps={{ shrink: true }}
                    />{' '}
                  </span>
                </Tooltip>
              </Grid>
            </>
          )}
          <Stack direction={'row'} spacing={2} sx={{ mt: 4, ml: 6 }}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="ion:arrow-back-circle-outline" />}
              onClick={handleBack}
            >
              Back
            </Button>
            <Stack direction={'row'} spacing={1}>
              <Button
                onClick={methods.handleSubmit(onSubmit)}
                variant="contained"
                startIcon={<Iconify icon="eva:cloud-upload-fill" />}
                disabled={step === 1 && isSubmitting === true}
              >
                {step === 0 ? 'Next' : 'Submit'}
              </Button>
              {step === 1 && isSubmitting && <CircularProgress />}
            </Stack>
          </Stack>
        </Grid>
      </FormProvider>
    </>
  );
};

export default OrgCounterPartyForm;
