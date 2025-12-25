import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "../features/patientsSlice";
import rendezReducer from "../features/rendezvousSlice"; // ← nom du fichier
import consultationsReducer from "../features/consultationsSlice";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    rendezVous: rendezReducer, // ← clé utilisée dans useSelector
    consultations: consultationsReducer,
  },
});