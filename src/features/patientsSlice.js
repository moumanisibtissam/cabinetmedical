import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 🔹 Thunk pour charger les patients depuis JSON Server
export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async () => {
    const res = await fetch('http://localhost:4000/patients');
    return await res.json();
  }
);

const patientsSlice = createSlice({
  name: 'patients',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addPatient: (state, action) => {
      const newPatient = {
        ...action.payload,
        id: Date.now(),
        dossierNum: `DOC-${String(state.list.length + 1).padStart(4, '0')}`,
        age: calculateAge(action.payload.birthDate),
      };
      state.list.push(newPatient);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

function calculateAge(birthDate) {
  const diff = Date.now() - new Date(birthDate).getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const { addPatient } = patientsSlice.actions;
export default patientsSlice.reducer;