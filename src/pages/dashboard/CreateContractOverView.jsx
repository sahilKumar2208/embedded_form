import { Helmet } from 'react-helmet-async';
import { CreateContract } from 'src/sections/overview/createContract/CreateContract';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Step, Stepper, StepLabel } from '@mui/material';
import ContractBasicInfo from 'src/sections/overview/createContract/ContractBasicInfo';

// ----------------------------------------------------------------------

export default function CreateContractOverView() {
  const { launchId } = useParams();
  const [templateFields, setTemplateFields] = useState(null);
  const [templateVersionWarningFlag, setTemplateVersionWarningFlag] = useState(false);
  const [attributeValueMap, setAttributeValueMap] = useState(null);
  const [isCounterPartyAdditionDrawerOpen, setIsCounterPartyAdditionDrawerOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [counterParties, setCounterParties] = useState([]);
  const [template, setTemplate] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [orgFeatures, setOrgFeatures] = useState(null);

  // function to fetch the template fields
  async function fetchTemplateFields(templateId) {
    try {
      const response = await axios.get(
        `https://cmt-backend-playground.intellosync.com/api/v1/templates/${templateId}`,
        // `https://cmt-backend-playground.intellosync.com/api/v1/templates/${templateId}`,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMzUwNzAwNywiZXhwIjoxNzEzNTkzNDA3fQ.2pCtPkvoM2QKms3IDV0hdiqK95weWHzUxAXkLpdJ5H0',
          },
        }
      );
      const templateDetails = response.data.data;
      setTemplate(templateDetails);

      return templateDetails.templateFields;

      // Extract ID, type, and optionally isMandatory for counterpartyIndividual fields
      // const fieldDetails = templateDetails.templateFields.map((field) => {
      //   const fieldInfo = {
      //     id: field.id,
      //     type: field.type,
      //     label: field.label,
      //   };

      //   return fieldInfo;
      // });

      // return fieldDetails;
    } catch (error) {
      console.error('Error fetching template fields:', error);
      throw new Error('Failed to fetch template fields');
    }
  }

  // if type === counterparties wala
  async function fetchCounterparties() {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://cmt-backend-playground.intellosync.com/api/v1/thirdPartyUsers/all/counterparties?type=IndependentIndividual',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMzUwNzAwNywiZXhwIjoxNzEzNTkzNDA3fQ.2pCtPkvoM2QKms3IDV0hdiqK95weWHzUxAXkLpdJ5H0',
      },
    };

    try {
      const response = await axios.request(config);
      console.log('get counterparties 111111 ', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch counterparties');
    }
  }

  const fetchLaunchForm = async () => {
    try {
      const fetchLaunchFormResponse = await axios.get(
        `http://localhost:3015/api/v1/launchForm/${launchId}`,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMzUwNzAwNywiZXhwIjoxNzEzNTkzNDA3fQ.2pCtPkvoM2QKms3IDV0hdiqK95weWHzUxAXkLpdJ5H0',
          },
        }
      );

      console.log(fetchLaunchFormResponse, 'fetchLaunchFormResponse');
      return fetchLaunchFormResponse.data;
    } catch (error) {
      console.log('error in fetching launch form from the function', error);
    }
  };

  const fetchOrgFeatures = async () => {
    try {
      const fetchOrgFeaturesResponse = await axios.get(
        'https://cmt-backend-playground.intellosync.com/api/v1/org/featureFlags',
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMzUwNzAwNywiZXhwIjoxNzEzNTkzNDA3fQ.2pCtPkvoM2QKms3IDV0hdiqK95weWHzUxAXkLpdJ5H0',
          },
        }
      );

      console.log('org features response --->', fetchOrgFeaturesResponse);
      return fetchOrgFeaturesResponse;
    } catch (error) {
      console.log('error in fetching orgFeatures');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const getLaunchForm = async () => {
        try {
          const launchForm = await fetchLaunchForm(launchId);
          console.log('launchForm details --->', launchForm);
          const templateId = launchForm.templateId;
          const contractFields = launchForm.contractFields;
          setAttributeValueMap(contractFields);
          console.log('Attribute value map ----->', attributeValueMap);
          const templateFieldDetails = await fetchTemplateFields(templateId);
          setTemplateFields(templateFieldDetails);
        } catch (error) {
          console.log('Error in getting launch form', error);
        }
      };

      getLaunchForm();

      const getCounterparties = async () => {
        try {
          const counterparties = await fetchCounterparties();
          console.log('counterparties wala data iss --->', counterparties);
          setCounterParties(counterparties);
          console.log('capital wala counterparty --->', counterParties);
        } catch (error) {
          console.log('error in fetching counter parties', error);
        }
      };
      getCounterparties();

      const getOrgFeatures = async () => {
        try {
          const retrievedOrgFeatures = await fetchOrgFeatures();
          console.log('org features --->', retrievedOrgFeatures);
          setOrgFeatures(retrievedOrgFeatures.data);
        } catch (error) {
          console.log('error in getting orgFeatures', error);
        }
      };
      getOrgFeatures();
    };

    // Call the fetchData function
    fetchData();
  }, []);

  console.log(templateFields, 'templateFields');

  const handleNext = () => {
    if (activeStep < 1) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    console.log('handle back was called !!!');
    if (activeStep > 0) setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Helmet>
        <title>Create Contract-Intellosync</title>
      </Helmet>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Contract Info</StepLabel>
        </Step>
        <Step>
          <StepLabel>Contract Details</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 0 && orgFeatures && (
        <ContractBasicInfo orgFeatures={orgFeatures} template={template} onNext={handleNext} />
      )}
      {activeStep === 1 && (
        <CreateContract
          attributeValueMap={attributeValueMap}
          counterParties={counterParties}
          templateFields={templateFields}
          setCounterParties={setCounterParties}
          template={template}
          orgFeatures={orgFeatures}
          onBack={handleBack}
        />
      )}
    </>
  );
}
