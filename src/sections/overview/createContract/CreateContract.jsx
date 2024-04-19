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
import { getSchema } from 'src/utils/getSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { dispatch, useSelector } from 'src/redux/store';

export const CreateContract = ({
  attributeValueMap,
  counterParties,
  setCounterParties,
  templateFields,
  template,
  orgFeatures,
  onBack,
}) => {
  const [templateVersionWarningFlag, setTemplateVersionWarningFlag] = useState(false);
  const [isCounterPartyAdditionDrawerOpen, setIsCounterPartyAdditionDrawerOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [loading, setLoading] = useState(false);
  const schema = getSchema(templateFields);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const obj = { addressFieldd: { city: 'vaaaaaaa' }, 'addressFieldd.country': 'ttt' };
  const contractBasicInfo = useSelector((state) => state.form);
  console.log(attributeValueMap, 'attribute value map qwerty');

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: attributeValueMap,
  });

  const { setValue, watch, reset, handleSubmit } = methods;

  // Function to get access token from Salesforce using Client Credentials flow
  async function getAccessToken() {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://4d23-103-251-142-10.ngrok-free.app/api/v1/salesforce/auth`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios(config);
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  console.log('wwwwwwwwwww', watch());

  // Function to make entry to Salesforce custom object
  async function createSalesforceRecord(data, template, contractResponse) {
    console.log('contract response data 1111 --->', contractResponse);
    const payload = {
      template: template,
      data: data,
      contractResponse: contractResponse,
    };

    try {
      const response = await axios.post(
        `https://4d23-103-251-142-10.ngrok-free.app/api/v1/salesforce/record`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMzUwNzAwNywiZXhwIjoxNzEzNTkzNDA3fQ.2pCtPkvoM2QKms3IDV0hdiqK95weWHzUxAXkLpdJ5H0',
          },
        }
      );

      // Handle success response
      console.log('Record created successfully:', response.data);
    } catch (error) {
      console.error('Error creating record in Salesforce:', error);
      // Handle error
    }
  }

  const onBackClick = () => {
    onBack();
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log('Data on submit:', data);

      const contract = {
        contractFields: { ...data },
        name: contractBasicInfo.contractTitle,
        searchTags: template.searchTags,
        templateId: template._id,
        templateVersion: template.version,
      };

      console.log("orgFeatures --->", orgFeatures);

      if (orgFeatures?.multipleEntities) {
        console.log("reachedddd here !!!!", orgFeatures?.multipleEntities);
        contract.entity = contractBasicInfo.entity;
        contract.entitySignatory = [contractBasicInfo.entitySignatory];
      }

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://cmt-backend-playground.intellosync.com/api/v1/contracts',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMzUwNzAwNywiZXhwIjoxNzEzNTkzNDA3fQ.2pCtPkvoM2QKms3IDV0hdiqK95weWHzUxAXkLpdJ5H0',
        },
        data: contract,
      };

      console.log("contract prepared !!!", contract);

      const contractResponse = await axios(config);
      console.log("contract creation response", contractResponse);

      await createSalesforceRecord(data, template, contractResponse.data.data);

      setLoading(false);
      setOpenDialogue(true);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
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

      <FormProvider methods={methods}>
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
              <Button onClick={onBackClick} variant="contained">
                Back
              </Button>
              <Button sx={{ ml: 5 }} onClick={handleSubmit(onSubmit)} variant="contained">
                Create contract
              </Button>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
};
