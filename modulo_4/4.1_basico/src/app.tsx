import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./login";
import { ListPage } from "./list";
import { DetailPage } from "./detail";
import { OrganizationProvider } from "./organization.context";
import { RickListPage } from "./rick-list";
import { RickCharacterPage } from "./rick-character";

export const App = () => {
  return (
    <OrganizationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="rick-list" element={<RickListPage />} />
          <Route path="rick-list/:id" element={<RickCharacterPage />} />
        </Routes>
      </Router>
    </OrganizationProvider>
  );
};
