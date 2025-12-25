import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:4000/consultations";

// ✅ Fetch consultations
export const fetchConsultations = createAsyncThunk(
  "consultations/fetchConsultations",
  async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  }
);

// ✅ Create a new consultation
export const createConsultation = createAsyncThunk(
  "consultations/createConsultation",
  async (consultation) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(consultation),
    });
    const data = await response.json();
    return data;
  }
);

const consultationsSlice = createSlice({
  name: "consultations",
  initialState: {
    consultations: [],
    loading: false,
    error: null,
  },
  reducers: {
    addConsultation: (state, action) => {
      state.consultations.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsultations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConsultations.fulfilled, (state, action) => {
        state.loading = false;
        state.consultations = action.payload;
      })
      .addCase(fetchConsultations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createConsultation.fulfilled, (state, action) => {
        state.consultations.push(action.payload);
      });
  },
});

export const { addConsultation } = consultationsSlice.actions;
export default consultationsSlice.reducer;