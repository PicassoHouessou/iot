import React from 'react';
import ForgotPassword from '../pages/ForgotPassword';
import InternalServerError from '../pages/InternalServerError';
import LockScreen from '../pages/LockScreen';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import VerifyAccount from '../pages/VerifyAccount';
import { AdminPages } from '@Admin/constants';

const publicRoutes = [
    { path: AdminPages.SIGN_IN, element: <Signin /> },
    { path: AdminPages.SIGN_UP, element: <Signup /> },
    { path: AdminPages.VERIFY, element: <VerifyAccount /> },
    { path: 'forgot', element: <ForgotPassword /> },
    { path: 'lock', element: <LockScreen /> },
    { path: 'error-404', element: <NotFound /> },
    { path: 'error-500', element: <InternalServerError /> },
];

export default publicRoutes;
