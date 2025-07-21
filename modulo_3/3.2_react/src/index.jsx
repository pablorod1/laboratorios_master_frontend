import React from "react";
import { createRoot } from "react-dom/client";
import logoImg from "./content/logo.svg";
import "./mystyles.scss";
import "./testEnv.js"; // This will log the API base URL to the console

const root = createRoot(document.getElementById("root"));
root.render(
  <div>
    <h1 className="title">Hola Mundo</h1>
    <img src={logoImg} alt="Logo" />
  </div>
);
