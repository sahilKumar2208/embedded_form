import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axiosInstance from 'src/utils/axios';
import { Tabs, Tab, Box } from '@mui/material';
import _ from 'lodash';
import { Helmet } from 'react-helmet-async';
import { SplashScreen } from 'src/components/loading-screen';
import OrganizationSummary from './OrganizationSummary';
import RenderOrgUsers from './RenderOrgUsers';
import { RenderOrgUserGroups } from './RenderOrgUserGroups';
import { RenderOrgContractTypes } from './RenderOrgContractTypes';
import { RenderOrgSettings } from './RenderOrgSettings';

const tabValues = [
  {
    value: 0,
    label: 'Summary',
    component: (
      template,
      setOrgDetails,
      orgActivity,
      orgUserGroups,
      contractTypes,
      aiSettings,
      editorSettings,
      eSignSettings
    ) => (
      <>
        {' '}
        <Helmet>
          <title>Organization Summary</title>
        </Helmet>
        <OrganizationSummary
          setOrgDetails={setOrgDetails}
          organization={template}
          orgActivity={orgActivity}
          orgUserGroups={orgUserGroups}
        />{' '}
      </>
    ),
  },
  {
    value: 1,
    label: 'Users',
    component: (
      template,
      setOrgDetails,
      orgActivity,
      orgUserGroups,
      orgsUsers,
      contractTypes,
      aiSettings,
      editorSettings,
      eSignSettings
    ) => (
      <>
        {' '}
        <Helmet>
          <title>Users </title>
        </Helmet>
        <RenderOrgUsers
          orgActivity={orgActivity}
          orgUserGroups={orgUserGroups}
          orgsUsers={orgsUsers}
        />
      </>
    ),
  },
  {
    value: 2,
    label: 'User Groups',
    component: (
      template,
      setOrgDetails,
      orgActivity,
      orgUserGroups,
      orgsUsers,
      contractTypes,
      aiSettings,
      editorSettings,
      eSignSettings
    ) => (
      <>
        {' '}
        <Helmet>
          <title>User Groups </title>
        </Helmet>
        <RenderOrgUserGroups orgUserGroups={orgUserGroups} />
      </>
    ),
  },
  {
    value: 3,
    label: 'Contract Types',
    component: (
      template,
      setOrgDetails,
      orgActivity,
      orgUserGroups,
      orgsUsers,
      contractTypes,
      aiSettings,
      editorSettings,
      eSignSettings
    ) => (
      <>
        {' '}
        <Helmet>
          <title>Contract Types </title>
        </Helmet>
        <RenderOrgContractTypes contractTypes={contractTypes} />
      </>
    ),
  },
  {
    value: 4,
    label: 'Settings',
    component: (
      template,
      setOrgDetails,
      orgActivity,
      orgUserGroups,
      orgsUsers,
      contractTypes,
      aiSettings,
      editorSettings,
      eSignSettings
    ) => (
      <>
        {' '}
        <Helmet>
          <title>Org Settings </title>
        </Helmet>
        <RenderOrgSettings
          aiSettings={aiSettings}
          editorSettings={editorSettings}
          eSignSettings={eSignSettings}
        />
      </>
    ),
  },
];
function OrganizationOverview() {
  const { id } = useParams();
  const [orgDetails, setOrgDetails] = useState({});
  const [orgActivity, setOrgActivity] = useState({});
  const [orgUserGroups, setOrgUserGroups] = useState({});
  const [orgsUsers, setOrgsUsers] = useState({});
  const [contractTypes, setContractTypes] = useState({});
  const [aiSettings, setAiSettings] = useState({});
  const [editorSettings, setEditorSettings] = useState({});
  const [eSignSettings, setESignSettings] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [value, setValue] = useState(0);

  const fetchOrg = async () => {
    return axiosInstance
      .get(`/v1/support/org/${id}`)
      .then((response) => {
        setOrgDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchOrgActivity = () => {
    axiosInstance
      .get(`/v1/support/orgActivity/${id}`)
      .then((response) => response.data)
      .then((data) => {
        console.log(data.result, 'org activity data');
        setOrgActivity(data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchOrgUserGroups = () => {
    axiosInstance
      .get(`/v1/support/org/userGroup/${id}`)
      .then((response) => response.data)
      .then((data) => {
        console.log(data.result, 'org user groups data');
        setOrgUserGroups(data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchOrgUsers = () => {
    axiosInstance
      .get(`/v1/support/org/users/${id}`)
      .then((response) => response.data)
      .then((data) => {
        setOrgsUsers(data.result);
        console.log(data.result, 'org users data');
        console.log(orgsUsers, 'org users');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchOrgContractTypes = () => {
    axiosInstance
      .get(`/v1/support/org/${id}/contractTypes`)
      .then((response) => response.data)
      .then((data) => {
        setContractTypes(data.result);
        console.log(data.result, 'org users data');
        console.log(orgsUsers, 'org users');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchOrgAISettings = () => {
    axiosInstance
      .get(`/v1/support/org/${id}/aiSettings`)
      .then((response) => response.data)
      .then((data) => {
        setAiSettings(data.result.data);
        console.log(aiSettings, 'org ai settings');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchOrgEditorSettings = () => {
    axiosInstance
      .get(`/v1/support/org/${id}/editorSettings`)
      .then((response) => response.data)
      .then((data) => {
        setEditorSettings(data.result.data);
        console.log(editorSettings, 'org editor settings');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchOrgEsignSettings = () => {
    axiosInstance
      .get(`/v1/support/org/${id}/eSignSettings`)
      .then((response) => response.data)
      .then((data) => {
        setESignSettings(data.result.data);
        console.log(eSignSettings, 'org eSign settings');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchOrg();
    fetchOrgActivity();
    fetchOrgUserGroups();
    fetchOrgUsers();
    fetchOrgContractTypes();
    fetchOrgAISettings();
    fetchOrgEditorSettings();
    fetchOrgEsignSettings();
  }, [searchParams]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearchParams({ tab: newValue + 1 });
  };

  if (!orgDetails) {
    return <SplashScreen />;
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
          sx={{ '& .MuiTabs-root': { minHeight: '40px' } }}
        >
          {tabValues.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} sx={{ minHeight: '40px' }} />
          ))}
        </Tabs>
        <br />
        {tabValues[value].component(
          orgDetails,
          setOrgDetails,
          orgActivity,
          orgUserGroups,
          orgsUsers,
          contractTypes,
          aiSettings,
          editorSettings,
          eSignSettings
        )}
        <br />
      </Box>
    </>
  );
}

export default OrganizationOverview;
