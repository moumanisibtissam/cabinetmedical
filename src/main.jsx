import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; // Import the Provider
import { store } from "./store"; // Import your store

import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout";
import "./index.css";
import App from "./App";
import PatientForm from "./pages/PatientForm";
import PatientsList from "./pages/PatientsList";
import PatientDossier from "./pages/PatientDossier";


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Provider store={store}> {/* Wrap everything in Provider */}
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<App />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<PatientsList />} />
          <Route path="/patients/ajouter" element={<PatientForm />} />
          <Route path="/patients/:id" element={<PatientDossier />} />
          <Route path="/appointments" element={<div>Appointments</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);