import { Divider, Grid, Typography, Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider from 'src/components/hook-form/form-provider';
import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from 'src/utils/axios';
import { useNavigate } from 'react-router';
import OrgForm from '../OrgForm';

const defaultValues = {
  maxNumberofUsers: 10,
  editorAccessLimit: 20,
  contractForEsignPerMonth: 10,
  editor: true,
  esign: true,
  aiAssist: true,
};

const schema = yup.object({
  name: yup.string().required('Unique name of org is required'),
  adminFullName: yup.string().required('Admin fullname is required'),
  contactEmail: yup.string().required('Unique email is required'),
});

export default function CreateOrg() {
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { setValue, watch, reset } = methods;
  const { enqueueSnackbar } = useSnackbar();

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
    // e.preventDefault();
    console.log('Hello from create org', data);

    try {
      const formatData = {
        ...data,
        features: {
          editor: data.editor,
          esign: data.esign,
          aiAssist: data.aiAssist,
        },
      };

      // Clear the values of individual features
      delete formatData.editor;
      delete formatData.esign;
      delete formatData.aiAssist;
      console.log(formatData, 'formmmm');
      const response = await axiosInstance.post('/v1/support/org', formatData, {});
      console.log('respnse on creating data', response);
      reset();
      enqueueSnackbar('Org created has been updated!!');
      navigate(`/organization/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(watch(), 'formValues');
  return (
    <>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              Create a new Organization
            </Typography>
            <Divider variant="middle" />
            <br />
          </Grid>

          <OrgForm handleDrop={handleDrop} imageUrl={imageUrl} />
          <Grid item sx={{ p: 2 }} xs={12} sm={12} md={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
