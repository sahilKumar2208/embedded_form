import {
  Divider,
  Grid,
  Typography,
  Box,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import React, { useEffect, useState } from 'react';
import axiosInstance from 'src/utils/axios';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CompressOutlined } from '@mui/icons-material';
import CounterPartyAdditionDrawer from './counterpartyUtils/counterpartyForm/CounterPartyAdditionDrawer';
import RenderField from './RenderField';
import { LoadingScreen, SplashScreen } from 'src/components/loading-screen';
import { useSnackbar } from 'src/components/snackbar';

export const CreateContract = ({
  attributeValueMap,
  counterParties,
  setCounterParties,
  templateFields,
  template,
}) => {
  const [templateVersionWarningFlag, setTemplateVersionWarningFlag] = useState(false);
  const [isCounterPartyAdditionDrawerOpen, setIsCounterPartyAdditionDrawerOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const obj = { addressFieldd: { city: 'vaaaaaaa' }, 'addressFieldd.country': 'ttt' };
  console.log(attributeValueMap, 'attribute value map qwerty');

  const methods = useForm({
    defaultValues: attributeValueMap,
  });

  const { setValue, watch, reset } = methods;

  console.log('wwwwwwwwwww', watch());

  //ye function call hoga on submit
  const onSubmit = async (data) => {
    setLoading(true);
    // console.log('data on submit', data);
    let contract = {};
    // let flattenedData = Object.assign({}, ...Object.values(data));
    // console.log("fllllattttt", flattenedData);
    contract.contractFields = { ...data };

    console.log('nnnnnnnnnnnnnnnnnnnnaaaaaaaaaaaaaa', template);
    contract.name = template.name;
    contract.searchTags = template.searchTags;
    contract.templateId = template._id;
    contract.templateVersion = template.version;

    console.log(contract, 'contttttt');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://cmt-backend-playground.intellosync.com/api/v1/contracts',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMjcyODU3NCwiZXhwIjoxNzEyODE0OTc0fQ.KrAQecvAvRHPStBRJSxBe2_f_TGK6mMAYgEn_CBTYqk',
      },
      data: contract,
    };

    try {
      // enqueueSnackbar('Your contract is being created, it may take few seconds...', {
      //   variant: 'info',
      // });
      const contractReesponse = await axios(config);
      // enqueueSnackbar('Contract successfully created', { variant: 'success' });
    } catch (error) {
      console.error('Error:', error);
    }
    // axios(config)
    //   .then((response) => {
    //     console.log('Response:', response.data);
    //   })
    //   .catch((error) => {});
    setLoading(false);
    setOpenDialogue(true);
  };

  const openFieldsAsDrawer = (e) => {
    e.preventDefault();
    setOpenDrawer(!openDrawer);
  };

  const closeFieldsDrawer = () => {
    setOpenDrawer(false);
  };

  const handleClose = () => {
    // navigate(-1);
    setOpenDialogue(false);
  };

  console.log(watch(), 'formValues');

  if (loading) return <SplashScreen />;

  return (
    <div>
      <Dialog sx={{ padding: 2 }} open={openDialogue} onClose={handleClose}>
        <DialogTitle>Congrats!</DialogTitle>
        <DialogContent>Your contract has been created.</DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Got it.
          </Button>
        </DialogActions>
      </Dialog>
      <Grid xs={12} s={12} md={12} variant="contained" sx={{ textAlign: 'right' }}>
        {templateFields &&
          templateFields.filter(
            (res) =>
              res.type === 'counterpartyOrg' ||
              res.type === 'counterpartyOrgPerson' ||
              res.type === 'counterpartyIndividual'
          ).length === 0 && (
            <Button sx={{ mr: 1 }} variant="outlined" onClick={openFieldsAsDrawer}>
              Assign to Any Other Party
            </Button>
          )}
        {isCounterPartyAdditionDrawerOpen && (
          <CounterPartyAdditionDrawer
            open={isCounterPartyAdditionDrawerOpen}
            setIsCounterPartyAdditionDrawerOpen={setIsCounterPartyAdditionDrawerOpen}
            setCounterParties={setCounterParties}
            counterParties={counterParties}
            attributeValueMap={attributeValueMap}
          />
        )}
      </Grid>

      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={12} md={10}>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              Create contract
            </Typography>
            <br />
            <Divider variant="middle" />
          </Grid> */}
          <Grid item xs={12} sm={12} md={10}></Grid>
          <Grid item xs={12} sm={12} md={2}>
            {templateFields &&
              templateFields.filter(
                (res) =>
                  res.type == 'counterpartyOrg' ||
                  res.type === 'counterpartyOrgPerson' ||
                  res.type === 'counterpartyIndividual'
              ).length !== 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    sx={{ ml: 1 }}
                    variant="outlined"
                    onClick={(e) => setIsCounterPartyAdditionDrawerOpen(true)}
                  >
                    Add Counterparty
                  </Button>
                </Box>
              )}
          </Grid>
          <Grid item xs={12} sm={12} md={12}></Grid>
          {templateFields?.map((fieldDetails, idx) => {
            console.log(fieldDetails, 'fielddetails are here ');
            {
              return (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  key={idx}
                  md={
                    fieldDetails.type === 'address' ||
                    fieldDetails.type === 'monetary' ||
                    fieldDetails.type === 'duration' ||
                    fieldDetails.type === 'phone' ||
                    fieldDetails.type === 'counterpartyIndividual' ||
                    fieldDetails.type === 'counterpartyOrg' ||
                    fieldDetails.type === 'counterpartyOrgPerson' ||
                    fieldDetails.type === 'paragraph'
                      ? 12
                      : 6
                  }
                >
                  <Tooltip title={fieldDetails.id} placement="top-end">
                    <span>
                      <RenderField
                        attributeValueMap={attributeValueMap}
                        otherPartyMode={false}
                        fieldDetails={fieldDetails}
                        control={methods.control}
                        counterParties={counterParties}
                      />
                    </span>
                  </Tooltip>
                </Grid>
              );
            }
          })}
          {/* <OrgForm /> */}
          <Grid item sx={{ p: 2 }} xs={12} sm={12} md={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained">
                Create contract
              </Button>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
};
