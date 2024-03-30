import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "@components/Layout/Layout";
import { List } from "@components/List/List";
import { LoginContainer } from "../../auth/LoginContainer/LoginContainer";
import { RegContainer } from "../../auth/RegContainer/RegContainer";
import { PrivateRoute } from "@components/PrivateRoute/PrivateRoute";

export const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<List />} />
        </Route>
        <Route path="login" element={<LoginContainer />} />
        <Route path="reg" element={<RegContainer />} />
      </Routes>
    </React.Fragment>
  );
};
