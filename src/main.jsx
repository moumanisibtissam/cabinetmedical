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
import RendezList from "./pages/RendezList";
import RendezForm from "./pages/RendezForm";
import ConsultationsList from "./pages/ConsultationsList";
import ConsultationForm from "./pages/ConsultationForm";
import Planning from "./pages/Planning";


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
          <Route path="/rendez-vous" element={<RendezList />} />
          <Route path="/rendez-vous/ajouter" element={<RendezForm />} />
          <Route path="/consultations" element={<ConsultationsList />} />
          <Route path="/Consultation/ajouter" element={<ConsultationForm />} />
          <Route path="/planning" element={<Planning />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);