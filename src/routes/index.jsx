import { Navigate, useRoutes } from 'react-router-dom';
// auth
import { GuestGuard, AuthGuard } from 'src/auth/guard';

// elements
import { LoginPage } from './elements';
import { Organizations } from 'src/sections/overview/app/view';
import OverviewAppPage from 'src/pages/dashboard/app';
import DashboardLayout from 'src/layouts/dashboard';
import AuthClassicLayout from 'src/layouts/auth/classic';
import UserProfilePage from 'src/pages/dashboard/user/profile';
import OrganizationsOverview from 'src/sections/overview/app/RenderOrganization/OrganizationsOverview';
import CreateOrganization from 'src/pages/dashboard/createOrganization';
import { ContractType } from 'src/sections/overview/app/RenderOrganization/Actions/ContractType';
import AddOrgUsers from 'src/pages/dashboard/CreateTrialAccounts';
import CreateTrialAccounts from 'src/pages/dashboard/CreateTrialAccounts';
import CreateContractOverView from 'src/pages/dashboard/CreateContractOverView';
import LoginSuccessPage from 'src/pages/dashboard/LoginSuccessPage';

// ----------------------------------------------------------------------

export default function Router() {
  console.log("Hello I'm here");
  return useRoutes([
    // auth
    {
      path: 'auth',
      children: [
        {
          path: 'jwt/login',
          element: (
            <GuestGuard>
              <AuthClassicLayout>
                <LoginPage />
              </AuthClassicLayout>
            </GuestGuard>
          ),
        },
      ],
    },

    // Dashboard
    {
      path: '/',
      element: (
        // <AuthGuard>
        //   <DashboardLayout />
        // </AuthGuard>
        <DashboardLayout />
      ),
      children: [
        { path: '/', element: <LoginSuccessPage /> },
        { path: '/:orgId/launch/:launchId', element: <CreateContractOverView /> },
        { path: '/create-contract', element: <CreateContractOverView /> },
        // { path: '/', element: <OverviewAppPage /> },
        { path: '/dashboard', element: <OverviewAppPage /> },
        {
          path: '/organizations',
          element: <OverviewAppPage />,
        },
        {
          path: '/organization/:id',
          element: <OrganizationsOverview />,
        },
        {
          path: '/organization/:id/contracts',
          element: <ContractType />,
        },
        {
          path: '/create-organization',
          element: <CreateOrganization />,
        },
        {
          path: '/trial-account',
          element: <CreateTrialAccounts />,
        },
        { path: '/settings/user-profile', element: <UserProfilePage /> },
      ],
    },
  ]);
}
