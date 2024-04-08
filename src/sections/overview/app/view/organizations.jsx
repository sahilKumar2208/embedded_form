import React, { useState, useEffect } from 'react';
import OrganizationView from '../OrganizationView';
import axios from 'src/utils/axios';
import { LoadingScreen } from 'src/components/loading-screen';

export default function Organizations() {
  const [organizationRow, setOrganizationRow] = useState(null);
  //console.log(templateRows);

  const fetchOrganizitionData = () => {
    axios
      .get('/v1/support/orgs')
      .then((response) => response.data)
      .then((data) => {
        console.log('organization data is ' + data);
        console.log(data, 'dataaaaaaaaaa');
        setOrganizationRow(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchOrganizitionData();
  }, []);

  console.log('organizationRowwww', organizationRow);

  return !organizationRow ? (
    <LoadingScreen />
  ) : (
    <OrganizationView orgainzations={organizationRow} />
  );
  // return organizationRow && <OrganizationView organizationRow />;
}
