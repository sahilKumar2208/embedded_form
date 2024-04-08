import { Helmet } from 'react-helmet-async';
import { CreateTrialAccount } from 'src/sections/overview/CreateTrialAccount/view/CreateTrialAccount';

// ----------------------------------------------------------------------

export default function CreateTrialAccounts() {
  return (
    <>
      <Helmet>
        <title>Create Org Account </title>
      </Helmet>
      <CreateTrialAccount />
    </>
  );
}
