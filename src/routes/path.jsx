function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/jwt/login'),
};

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD + '/dashboard',
  settings: {
    company: path(ROOTS_DASHBOARD, '/settings/company'),
    assignGroup: path(ROOTS_DASHBOARD, '/settings/user-groups'),
    integration: path(ROOTS_DASHBOARD, '/settings/integrations'),
    userProfile: path(ROOTS_DASHBOARD, '/settings/user-profile'),
    alertSettings: path(ROOTS_DASHBOARD, '/settings/alerts'),
  },
  general: {
    // organizations: path(ROOTS_DASHBOARD, '/organizations'),
    CreateOrganization: path(ROOTS_DASHBOARD, '/create-organization'),
    trialAccount: path(ROOTS_DASHBOARD, '/trial-account'),
    createContract: path(ROOTS_DASHBOARD, '/create-contract'),
  },
};
