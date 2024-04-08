import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MobileStepper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Iconify from 'src/components/iconify/Iconify';
import axiosInstance from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import RenderAddressFields from '../../rendertypeOfFieldUtils/RenderAddressFields';

const IndividualCounterPartyForm = ({
  setCurrentStep,
  isComingFromOrgPage,
  setCounterPartyIndividualsOfOrg,
  counterPartyIndividualsOfOrg,
  orgId,
  setAddPOC,
  counterParties,
  setCounterParties,
  onClose,
  isSubmitting,
  setIsSubmitting,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const initialSchema = yup.object().shape({
    firstName: yup.string().required('First Name is Required'),
    fullName: yup.string().required('Full Name is Required'),
    email: yup.string().required('Email is required').email('Must be a valid email address'),
    jobTitle: yup.string(),
  });
  console.log(counterPartyIndividualsOfOrg, 'counterPartyIndividualsOfOrg');
  const [schema, setSchema] = useState(initialSchema);

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { watch, setValue } = methods;
  const [step, setStep] = useState(0);

  useEffect(() => {
    const firstName = watch('firstName') ? watch('firstName') : '';
    const middleName = watch('middleName') ? watch('middleName') : '';
    const lastName = watch('lastName') ? watch('lastName') : '';
    const fullName = `${firstName}${middleName ? ` ${middleName} ` : ' '}${lastName}`.trim();
    setValue('fullName', fullName);
  }, [watch('firstName'), watch('lastName'), watch('middleName')]);

  const onSubmit = (data) => {
    console.log(data, 'data');
    if (step === 0) {
      const finalSchema = yup.object().shape({
        address: yup.object().shape({
          addressLine1: yup.string(),
          city: yup.string().required('City is required'),
          state: yup.string(),
          postCode: yup
            .mixed()
            .test('is-valid-value', 'Please Enter a valid zip/post code', (value) => {
              return (
                value === undefined ||
                value === '' ||
                value === null ||
                /^\d{5,10}$/.test(value.trim())
              );
            })
            .nullable(),
          country: yup.string().required('Country is required'),
        }),
        // phoneNumber: yup.string().matches(/^[0-9()+\- ]+$/, "Invalid phone number"),
        // jobTitle: yup.string(),
      });
      setSchema(finalSchema);
      setStep(1);
    } else {
      // add counter party api call

      if (isComingFromOrgPage) {
        setIsSubmitting(true);
        axiosInstance
          .post('/thirdPartyUsers', { ...data, counterpartyType: 'Individual', orgId: orgId })
          .then((res) => {
            enqueueSnackbar('Counter Party created Successfully', { variant: 'success' });
            setCounterPartyIndividualsOfOrg([...counterPartyIndividualsOfOrg, res.data]);
            setAddPOC(0);
          })
          .catch((err) => {
            enqueueSnackbar('Some error occured', { variant: 'error' });
            setIsSubmitting(false);
          });
      } else {
        setIsSubmitting(true);
        axiosInstance
          .post('/thirdPartyUsers', { ...data, counterpartyType: 'Individual' })
          .then((res) => {
            enqueueSnackbar('Counter Party created Successfully', { variant: 'success' });
            setCounterParties([...counterParties, res.data]);
            onClose();
            setIsSubmitting(false);
          })
          .catch((err) => {
            enqueueSnackbar('Some error occured', { variant: 'error' });
            setIsSubmitting(false);
          });
      }
    }
  };

  const handleBack = () => {
    if (step === 0) {
      if (!isComingFromOrgPage) {
        setCurrentStep(0);
      }
    } else {
      setStep(0);
      setSchema(initialSchema);
    }
  };

  //   console.log(watch(), "formvaluesss");

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
        }}
      />
      <FormProvider methods={methods}>
        <Grid container spacing={2} sx={{ p: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, width: '100%' }}>
            <Typography variant={'subtitle1'}>Counter Party Details</Typography>
          </Box>
          {step === 0 && (
            <>
              <Grid item xs={6} sm={6} md={6}>
                <Tooltip title="Counter Party Individual First Name" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={'firstName'}
                      label="First name of Counter Party*"
                      placeholder="First Name"
                      InputLabelProps={{ shrink: true }}
                    />{' '}
                  </span>
                </Tooltip>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Tooltip title="Counter Party Individual Middle Name" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={'middleName'}
                      label="Middle name of Counter Party"
                      placeholder="Middle Name"
                      InputLabelProps={{ shrink: true }}
                    />{' '}
                  </span>
                </Tooltip>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Tooltip title="Counter Party Individual Last Name" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={'lastName'}
                      label="Last name of Counter Party"
                      placeholder="Last Name"
                      InputLabelProps={{ shrink: true }}
                    />{' '}
                  </span>
                </Tooltip>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Tooltip title="Counter Party Individual Full Name" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={'fullName'}
                      label="Full name of Counter Party*"
                      placeholder="Full Name"
                      InputLabelProps={{ shrink: true }}
                    />{' '}
                  </span>
                </Tooltip>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Tooltip title="Email Id of the Counter Party Individual" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={'email'}
                      label="Counter Party Individual Email Id*"
                      placeholder="Email Id"
                      InputLabelProps={{ shrink: true }}
                    />{' '}
                  </span>
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                <Tooltip title="Counter Party Individual Job Title" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={'jobTitle'}
                      label="Job Title of Counter Party"
                      placeholder="Job Title"
                      InputLabelProps={{ shrink: true }}
                    />{' '}
                  </span>
                </Tooltip>
              </Grid>
            </>
          )}
          {step === 1 && (
            <div style={{ padding: '15px' }}>
              <RenderAddressFields
                otherPartyMode={false}
                fieldDetails={{ id: 'address', isComingFromCountryParty: true }}
                labelText={'Permanent Address'}
              />
              {/* <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                <Tooltip title="Counter Party Individual Mobile Number" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={"phoneNumber"}
                      label="Mobile Number of Counter Party"
                      placeholder="Mobile Number"
                      InputLabelProps={{ shrink: true }}
                    />{" "}
                  </span>
                </Tooltip>
              </Grid> */}
              {/* <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                <Tooltip title="Counter Party Individual Job Title" placement="top-end">
                  <span>
                    <RHFTextField
                      size="medium"
                      name={"jobTitle"}
                      label="Job Title of Counter Party"
                      placeholder="Job Title"
                      InputLabelProps={{ shrink: true }}
                    />{" "}
                  </span>
                </Tooltip>
              </Grid> */}
            </div>
          )}

          <Stack direction={'row'} spacing={2} sx={{ mt: 4, ml: 6 }}>
            {isComingFromOrgPage && step === 0 ? (
              <></>
            ) : (
              <Button
                variant="contained"
                startIcon={<Iconify icon="ion:arrow-back-circle-outline" />}
                onClick={handleBack}
              >
                Back
              </Button>
            )}

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

export default IndividualCounterPartyForm;
