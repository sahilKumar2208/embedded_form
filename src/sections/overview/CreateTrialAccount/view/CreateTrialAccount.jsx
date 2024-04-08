import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { TrialAccountForm } from '../TrialAccountForm';
import FormProvider from 'src/components/hook-form/form-provider';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import axiosInstance from 'src/utils/axios';
import { useEffect, useState } from 'react';
import { AddOtherUserForm } from '../AddOtherUserForm';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { SplashScreen } from 'src/components/loading-screen';

// const schema = yup.object({
//   name: yup.string().required('Org Name is required'),
//   adminFullName: yup.string().required('Admin fullname is required'),
//   contactEmail: yup.string().required('Admin Email is required'),
// });

const schema = yup.object({
  name: yup.string().required('Org Name is required'),
  adminFullName: yup.string().required('Admin fullname is required'),
  contactEmail: yup.string().required('Admin Email is required'),
  Orgs: yup.array().required('At least one organization is required'),
  // otherUsers: yup.array().when('otherUsers', (otherUsers, schema) => {
  //   return otherUsers && otherUsers.length > 0
  //     ? yup
  //         .array()
  //         .of(
  //           yup.object({
  //             userName: yup.string().required('User Name is required'),
  //             userEmail: yup.string().email('Invalid email').required('User Email is required'),
  //             userGroup: yup.array().min(1, 'At least one user group is required'),
  //           })
  //         )
  //         .required('user details is required')
  //     : schema;
  // }),
});

const defaultValues = {
  sendEmail: false,
};

export function CreateTrialAccount() {
  // const [contractType, setContractType] = useState(null);
  const [orgs, setOrgs] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const userGroups = [
    { label: 'admin', value: 'admin' },
    { label: 'standard', value: 'standard' },
    { label: 'legal', value: 'legal' },
    { label: 'business', value: 'business' },
    { label: 'approvers', value: 'approvers' },
    { label: 'signatories', value: 'signatories' },
  ];
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { control, handleSubmit, watch, setValue, reset } = methods;
  const onSumit = async (data) => {
    console.log('hello', data);
    setLoading(true);
    try {
      const response = await axiosInstance.post('/v1/support/org/trial-account', data);
      console.log(response, 'response');
      reset();
      enqueueSnackbar('Default Org details has been set!');
      navigate(`/organization/${response.data.result.data._id}`);
      // console.log(response.data.result.data._id, 'response.data.result');
    } catch (error) {
      console.log(error);
      // setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: `otherUsers`,
  });

  const fetchOrganizition = () => {
    axiosInstance
      .get('/v1/support/orgs')
      .then((response) => response.data)
      .then((data) => {
        setOrgs(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // fetchContractType();
    fetchOrganizition();
  }, []);

  const handleAddItem = () => {
    append({
      userName: '',
      userEmail: '',
      userGroup: [],
    });
  };

  const handleDeleteLevel = (index) => {
    remove(index);
  };
  console.log(watch(), 'trail account');
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSumit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={10} md={10}>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              Create a Trial Org Account
            </Typography>
            <Divider variant="middle" />
            <br />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {/* <TrialAccountForm contractType={contractType} orgs={orgs} /> */}
            <TrialAccountForm orgs={orgs} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Stack
              xs={12}
              sm={6}
              md={6}
              direction={'row'}
              sx={{ justifyContent: 'space-between', mb: 1, mb: 1 }}
            >
              <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                Add Other Users
              </Typography>
              <Button variant="contained" onClick={handleAddItem}>
                Add User
              </Button>
            </Stack>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {fields.map((field, index) => (
              <AddOtherUserForm
                key={field.id}
                methods={methods}
                levelIndex={index}
                handleDeleteLevel={handleDeleteLevel}
                userGroups={userGroups}
              />
            ))}
          </Grid>
          <Grid item sx={{ pt: 2 }} xs={12} sm={12} md={12}>
            <Box>
              <Button type="submit" variant="contained">
                Create Account
              </Button>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
      {loading && <SplashScreen />}
    </>
  );
}
