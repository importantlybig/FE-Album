import React from "react";
import { useAuth } from "../hooks";
import { Outlet, Navigate } from "react-router-dom";

const Public = () => {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default Public;
