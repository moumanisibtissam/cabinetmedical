import { configureStore } from "@reduxjs/toolkit";

import patientsReducer from "./features/patientsSlice"; 

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
  },
});