import React, { FC } from "react";
import { useAuthContext } from "../../auth/AuthContextProvider";
import { Navigate } from "react-router-dom";

export interface TPrivateRoute {
  children: React.ReactNode;
}

export const PrivateRoute: FC<TPrivateRoute> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? children : <Navigate to="/login" />;
};
