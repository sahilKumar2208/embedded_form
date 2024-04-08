import { Helmet } from 'react-helmet-async';
import { CreateOrg } from 'src/sections/overview/CreateOrg/view';

// ----------------------------------------------------------------------

export default function CreateOrganization() {
  return (
    <>
      <Helmet>
        <title> Create Organization</title>
      </Helmet>
      <CreateOrg />
    </>
  );
}
