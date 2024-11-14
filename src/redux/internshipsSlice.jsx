import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    job_title: "",
    company: "",
    city: "",
    description: "",
    start_date: "",
    end_date: "",
    isOpen: true, // New internships start open by default
  },
];

const internshipsSlice = createSlice({
  name: "internships",
  initialState,
  reducers: {
    addInternship: (state) => {
      const newId = state.length ? state[state.length - 1].id + 1 : 1;
      state.push({
        id: newId,
        job_title: "",
        company: "",
        city: "",
        description: "",
        start_date: "",
        end_date: "",
        isOpen: true, // New internships start open by default
      });
    },
    updateInternshipField: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    toggleInternshipAccordion: (state, action) => {
      const index = action.payload;
      state[index].isOpen = !state[index].isOpen;
    },
    deleteInternship: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
  },
});

export const {
  addInternship,
  updateInternshipField,
  toggleInternshipAccordion,
  deleteInternship,
} = internshipsSlice.actions;
export default internshipsSlice.reducer;
