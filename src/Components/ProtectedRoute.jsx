import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  if (props.isLoggedIn) {
    return props.children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}

export default ProtectedRoute;
