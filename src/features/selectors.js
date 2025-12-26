// src/features/selectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectConsultations = createSelector(
  (state) => state.consultations?.consultations ?? [],
  (consultations) => consultations
);

export const selectPatients = createSelector(
  (state) => state.patients?.patients ?? [],
  (patients) => patients
);