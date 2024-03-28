import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "@components/Layout/Layout";
import { List } from "@components/List/List";
// import { LoginForm } from "@components/LoginForm/LoginForm";

export const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<List />} />
          {/* <Route index element={<LoginForm />} /> */}
        </Route>
      </Routes>
    </React.Fragment>
  );
};
