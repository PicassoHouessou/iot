import React from "react";
import ForgotPassword from "../pages/ForgotPassword";
import InternalServerError from "../pages/InternalServerError";
import LockScreen from "../pages/LockScreen";
import NotFound from "../pages/NotFound";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import VerifyAccount from "../pages/VerifyAccount";

const publicRoutes = [
    {path: "pages/signin", element: <Signin/>},
    {path: "pages/signup", element: <Signup/>},
    {path: "pages/verify", element: <VerifyAccount/>},
    {path: "pages/forgot", element: <ForgotPassword/>},
    {path: "pages/lock", element: <LockScreen/>},
    {path: "pages/error-404", element: <NotFound/>},
    {path: "pages/error-500", element: <InternalServerError/>},
];

export default publicRoutes;