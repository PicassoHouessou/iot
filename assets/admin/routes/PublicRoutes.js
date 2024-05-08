import React from "react";
import ForgotPassword from "../pages/ForgotPassword";
import InternalServerError from "../pages/InternalServerError";
import LockScreen from "../pages/LockScreen";
import NotFound from "../pages/NotFound";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import VerifyAccount from "../pages/VerifyAccount";

const publicRoutes = [
    {path: "signin", element: <Signin/>},
    {path: "signup", element: <Signup/>},
    {path: "verify", element: <VerifyAccount/>},
    {path: "forgot", element: <ForgotPassword/>},
    {path: "lock", element: <LockScreen/>},
    {path: "error-404", element: <NotFound/>},
    {path: "error-500", element: <InternalServerError/>},
];

export default publicRoutes;