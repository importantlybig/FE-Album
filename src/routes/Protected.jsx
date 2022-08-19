import React from "react";
import { useAuth } from "../hooks";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

const Protected = () => {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  return isLoggedIn === true ? <Outlet /> : <Login />;
};

export default Protected;
