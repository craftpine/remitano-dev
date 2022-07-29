import React, { useCallback } from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, ...props }) => {
  const token = localStorage.getItem("token");

  return token ? <Route {...props} render={children} /> : <Redirect to="/" />;
};

export default PrivateRoute;
