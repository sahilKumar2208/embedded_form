import FormProvider from 'src/components/hook-form/form-provider';
import { OrgAISetting } from './OrgSettings/OrgAISetting';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'src/components/snackbar';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { OrgEditorSetting } from './OrgSettings/OrgEditorSetting';
import { OrgEsignSetting } from './OrgSettings/OrgEsignSetting';
import axiosInstance from 'src/utils/axios';
import { useNavigate, useParams } from 'react-router';

const schema = yup.object({
  creditsInUSD: yup.string().required('Credits are required'),
  maxNumberofUsers: yup.number().required('Provide some number of users'),
  editorType: yup.string().required('Type of editor is required'),
  envelopePerMonth: yup.number().required('Envelopes/month are required'),
});

export const RenderOrgSettings = (props) => {
  const { aiSettings, editorSettings, eSignSettings } = props;
  console.log('settings: ', aiSettings, editorSettings, eSignSettings);

  const defaultValues = {
    aiEnabled: aiSettings.aiEnabled,
    creditsInUSD: aiSettings.creditsInUSD,
    editorEnabled: editorSettings.editorEnabled,
    maxNumberofUsers: editorSettings.maxNumberofUsers,
    editorType: editorSettings.editorType,
    esignEnabled: eSignSettings.esignEnabled,
    envelopePerMonth: eSignSettings.envelopePerMonth,
  };
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  console.log(id, 'id');
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;
  const onSubmit = async (data) => {
    console.log('Hello you clicked me!!!');
    try {
      const response = await axiosInstance.put(`/v1/support/org/${id}/orgSettings`, data);
      enqueueSnackbar('Org settings updated');
      //   console.log(response, 'response');
      navigate(`/organization/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              Editor Settings
            </Typography>
            <Divider variant="middle" />
            <br />
          </Grid>

          <OrgEditorSetting />
          <Grid item xs={12} sm={12} md={12}>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              AI Settings
            </Typography>
            <Divider variant="middle" />
            <br />
          </Grid>

          <OrgAISetting />

          <Grid item xs={12} sm={12} md={12}>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              Esign Settings
            </Typography>
            <Divider variant="middle" />
            <br />
          </Grid>

          <OrgEsignSetting />

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
};
