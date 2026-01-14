import { RouteObject } from 'react-router-dom';

import LogIn from '@/pages/LogIn';

import CreateAccount from '@/components/auth/CreateAccount';
import ResetPasswordEmail from '@/components/auth/ResetPasswordEmail';

const loginRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LogIn isLoggedIn={false} />,
  },
  {
    path: '/find_pw',
    element: <ResetPasswordEmail />,
  },
  {
    path: '*',
    element: <LogIn isLoggedIn={false} />,
  },
  {
    path: '/create_account',
    element: <CreateAccount />,
  },
];

export default loginRoutes;
