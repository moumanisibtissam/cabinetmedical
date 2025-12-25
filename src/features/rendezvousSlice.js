import { createSlice } from "@reduxjs/toolkit";

const rendezVousSlice = createSlice({
  name: "rendezVous",
  initialState: {
    list: [],
  },
  reducers: {
    ajouterRendezVous: (state, action) => {
      const newRdv = {
        id: Date.now(),
        ...action.payload,
      };
      state.list.push(newRdv);
    },
    modifierRendezVous: (state, action) => {
      const index = state.list.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    supprimerRendezVous: (state, action) => {
      state.list = state.list.filter(r => r.id !== action.payload);
    },
  },
});

export const { ajouterRendezVous, modifierRendezVous, supprimerRendezVous } = rendezVousSlice.actions;
export default rendezVousSlice.reducer;