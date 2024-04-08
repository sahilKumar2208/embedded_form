import React, { useCallback, useEffect, useState } from 'react';

import { Button, Card, Chip, Grid, Paper, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { fData } from '../../../utils/format-number';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/system';
import { useParams } from 'react-router';
import * as yup from 'yup';

import { useAuthContext } from 'src/auth/hooks';
import {
  RHFAutocomplete,
  RHFMultiSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import axiosInstance from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

const schema = yup.object({
  fullName: yup.string().required('Full Name is Required'),
});

// const TABS = [
//   {
//     value: 'profile',
//     label: 'Profile',
//     icon: <Iconify icon="solar:user-id-bold" width={24} />,
//   },
//   {
//     value: 'followers',
//     label: 'Followers',
//     icon: <Iconify icon="solar:heart-bold" width={24} />,
//   },
//   {
//     value: 'friends',
//     label: 'Friends',
//     icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
//   },
//   {
//     value: 'gallery',
//     label: 'Gallery',
//     icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
//   },
// ];

// ----------------------------------------------------------------------

export default function UserProfileView() {
  let { id } = useParams();
  const { user } = useAuthContext();
  const [imageUrl, setImageUrl] = useState('');
  const [defaultValues, setDefaultValues] = useState({});
  const [name, setName] = useState('');
  const [groups, setGroups] = useState([]);
  const [usersData, setusersData] = useState({});
  const [userGroupOptions, setUserGroupOptions] = useState();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  if (!id) {
    id = user._id;
  }

  console.log(id, 'id');

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { setValue, watch } = methods;
  useEffect(() => {
    console.log(`/v1/support/user/${id}`, 'userid dkj');
    axiosInstance.get(`/v1/support/user/${id}`).then((res) => {
      console.log(res.data.data, 'response of user with id');
      setusersData(res.data.data);

      setValue('fullName', res.data.data.fullName);
      setValue('email', res.data.data.email);
      setValue('orgName', res.data.data.orgId.name);
      setValue('role', res.data.data.role);

      setName(res.data.data.fullName);

      setGroups(
        res.data.data.userGroup.map((res) => {
          return { label: res.name, value: res._id };
        })
      );
      setImageUrl(res.data.data.profileURL);

      console.log(groups, 'groupsss');

      setValue(
        'userGroup',
        res.data.data.userGroup.map((res) => {
          return { value: res._id, label: res.name };
        })
      );
      console.log(res.data.data.profileURL, 'imge url');
      console.log(res.data.data.profileURL, 'image url from backend');
    });

    axiosInstance.get('/v1/support/userGroups').then((res) => {
      console.log(res.data, 'userGorup arehere');

      const transformedGroups = res.data.map((response) => {
        return {
          value: response._id,
          label: response.name,
        };
      });
      setUserGroupOptions([...transformedGroups]);

      console.log(transformedGroups, 'transformedgroups');
    });
    console.log('usersData: ', usersData);
  }, []);

  // console.log(setValue(), 'setValue');
  console.log(watch(), 'Watch');

  const handleDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles, 'acceptedFiles');
      const file = acceptedFiles[0];
      setImageUrl(file);
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      console.log(file, 'file is here');

      if (file) {
        setValue('profImage', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    setLoading(true);
    data.userGroup = data.userGroup.map((res) => {
      if (res.value !== undefined) {
        return res;
      }
    });

    // const formData = new FormData();
    // const imageField = "profImage";

    // if (data.profImage !== undefined) {
    //   const selectedKey = { [imageField]: data[imageField] };

    //   for (let key in selectedKey) {
    //     if (selectedKey.hasOwnProperty(key)) {
    //       formData.append(key, selectedKey[key]);
    //     }
    //   }

    //   const response = await axiosInstance.post("/document/uploadPublic", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

    //   setImageUrl(response.data.data.data.savedDocument.s3UrlOfDocument);
    //   const copiedData = { ...data };
    //   delete copiedData.profImage;
    //   copiedData.profileURL = response.data.data.data.savedDocument.s3UrlOfDocument;

    //   setName(copiedData.fullName);

    //   copiedData.userGroup = copiedData.userGroup.map((res) => res.value);

    //   const updatedUser = await axiosInstance.put(`/users/${id}`, {
    //     ...copiedData,
    //   });

    //   setImageUrl(updatedUser.data.profileURL);
    //   enqueueSnackbar("Profile has been updated!!");
    // } else {
    //   data.userGroup = data.userGroup.map((res) => res.value);

    //   const updatedUser = await axiosInstance.put(`users/${id}`, {
    //     ...data,
    //   });
    //   dispatch(setUserGroupsFlag({ name: "sejal" }));
    //   console.log("dfkdjfkdj");
    //   setName(data.fullName);
    //   enqueueSnackbar("Profile has been updated!!");
    // }

    // }

    try {
      data.userGroup = data.userGroup.map((res) => res.value);

      const updatedUser = await axiosInstance.put(`/v1/support/user/${id}`, {
        ...data,
      });
      console.log('dfkdjfkdj');
      setName(data.fullName);
      enqueueSnackbar('Profile has been updated!!');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <Typography variant="h3" paragraph>
        {name !== undefined ? `${name}'s` : `User's`} Profiles
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* <form> */}
          <Grid container spacing={2}>
            {/* <Grid item sx={{ paddingRight: "20px" }} xs={12} sm={12} md={4}> */}
            <Grid item xs={12} sm={12} md={4}>
              <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
                <Item>
                  <RHFUploadAvatar
                    // file="https://d27jswm5an3efw.cloudfront.net/app/uploads/2019/08/image-url-3.jpg"
                    file={imageUrl}
                    name="profImage"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary',
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br /> max size of {fData(3145728)}
                      </Typography>
                    }
                  />
                </Item>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={8} sx={{ paddingLeft: '20px' }}>
              <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
                <Item>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                      <Item>
                        <span>
                          <RHFTextField
                            size="medium"
                            name="fullName"
                            label="Full Name"
                            placeholder="Full Name"
                            InputLabelProps={{ shrink: true }}
                          />{' '}
                        </span>
                      </Item>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Item>
                        <span>
                          <RHFTextField
                            disabled
                            size="medium"
                            name="email"
                            label="User Email"
                            placeholder="Enter Email"
                            InputLabelProps={{ shrink: true }}
                          />{' '}
                        </span>
                      </Item>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Item>
                        <span>
                          <RHFTextField
                            disabled
                            size="medium"
                            name="orgName"
                            label="Company's Name"
                            placeholder="Company's Name"
                            InputLabelProps={{ shrink: true }}
                          />{' '}
                        </span>
                      </Item>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Item>
                        <span>
                          <RHFTextField
                            disabled
                            size="medium"
                            name="role"
                            label="Role"
                            placeholder="Role of User"
                            InputLabelProps={{ shrink: true }}
                          />{' '}
                        </span>
                      </Item>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Item>
                        <Typography sx={{ textAlign: 'left', marginBottom: '10px' }}>
                          Groups Assigned
                        </Typography>
                      </Item>
                      <Grid item xs={12} sm={12} md={6}>
                        <Item>
                          {console.log(usersData, 'usersDataaaa')}
                          {user.role !== 'admin' ? (
                            <span>
                              <Stack direction={'row'} spacing={1}>
                                {groups.map((resp) => (
                                  <Chip label={resp.label} />
                                ))}
                              </Stack>
                            </span>
                          ) : (
                            Object.keys(usersData).length !== 0 && (
                              <RHFAutocomplete
                                multiple
                                freeSolo
                                name="userGroup"
                                label="Groups"
                                options={userGroupOptions}
                                getOptionLabel={(option) => option.label}
                                ChipProps={{ size: 'small' }}
                                isOptionEqualToValue={(option, value) =>
                                  option.value === value.value
                                }
                              />
                            )
                          )}
                        </Item>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {/* {props.selfProfile && (
                        <Button
                          sx={{ mr: 2 }}
                          onClick={toggleChangePasswordContent}
                          variant="contained"
                        >
                          Change Password
                        </Button>
                      )} */}
                      <Button type="submit" variant="contained">
                        Save Changes
                      </Button>
                    </Box>
                  </Grid>
                </Item>
              </Card>
            </Grid>
          </Grid>
        </form>
      </FormProvider>

      {loading && <SplashScreen />}

      {/* {props.selfProfile && open && (
        <AccountChangePassword open={open} handleClose={toggleChangePasswordContent} />
      )} */}
    </div>
  );
}
