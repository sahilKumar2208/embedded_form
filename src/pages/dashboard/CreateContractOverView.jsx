import { Helmet } from 'react-helmet-async';
import { CreateContract } from 'src/sections/overview/createContract/CreateContract';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  // function to fetch the template fields
  async function fetchTemplateFields(templateId) {
    try {
      const response = await axios.get(
        `https://cmt-backend-playground.intellosync.com/api/v1/templates/${templateId}`,
        // `https://cmt-backend-playground.intellosync.com/api/v1/templates/${templateId}`,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMjcyODU3NCwiZXhwIjoxNzEyODE0OTc0fQ.KrAQecvAvRHPStBRJSxBe2_f_TGK6mMAYgEn_CBTYqk',
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
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMjcyODU3NCwiZXhwIjoxNzEyODE0OTc0fQ.KrAQecvAvRHPStBRJSxBe2_f_TGK6mMAYgEn_CBTYqk',
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
        `http://localhost:3015/api/v1/launchForm/${launchId}`
      );

      console.log(fetchLaunchFormResponse, 'fetchLaunchFormResponse');
      return fetchLaunchFormResponse.data;
    } catch (error) {
      console.log('error in fetching launch form from the function', error);
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
    };

    // Call the fetchData function
    fetchData();
  }, []);

  console.log(templateFields, 'templateFields');
  return (
    <>
      <Helmet>
        <title>Create Contract-Intellosync</title>
      </Helmet>
      {attributeValueMap && (
        <CreateContract
          attributeValueMap={attributeValueMap}
          counterParties={counterParties}
          templateFields={templateFields}
          setCounterParties={setCounterParties}
          template={template}
        />
      )}
    </>
  );
}
