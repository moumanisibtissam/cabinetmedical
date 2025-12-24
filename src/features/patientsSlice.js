import { createSlice } from '@reduxjs/toolkit';

const patientsSlice = createSlice({
  name: 'patients',
  initialState: { list: [] },
  reducers: {
    addPatient: (state, action) => {
      const newPatient = {
        ...action.payload,
        id: Date.now(),
        // Requirement: Automatic dossier number 
        dossierNum: `DOC-${String(state.list.length + 1).padStart(4, '0')}`,
        // Requirement: Automatic age calculation 
        age: calculateAge(action.payload.birthDate) 
      };
      state.list.push(newPatient);
    }
  }
});

function calculateAge(birthDate) {
  const diff = Date.now() - new Date(birthDate).getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const { addPatient } = patientsSlice.actions;
export default patientsSlice.reducer; 