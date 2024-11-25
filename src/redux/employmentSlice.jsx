import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    job_title: "",
    employer: "",
    city: "",
    description: "",
    start_date: "",
    end_date: "",
    is_current: false,
    isOpen: true, // Open by default
  },
];

const employmentSlice = createSlice({
  name: "employment",
  initialState,
  reducers: {
    addEmployment: (state) => {
      if (state.length >= 2) return; // Prevent adding more than 2 entries
      const newId = state.length ? state[state.length - 1].id + 1 : 1;
      state.forEach((job) => (job.isOpen = false)); // Close all accordions
      state.push({
        id: newId,
        job_title: "",
        employer: "",
        city: "",
        description: "",
        start_date: "",
        end_date: "",
        is_current: false,
        isOpen: true, // Open the new accordion
      });
    },
    updateEmploymentField: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    toggleEmploymentAccordion: (state, action) => {
      const index = action.payload;
      state[index].isOpen = !state[index].isOpen; // Toggle open/close
      state.forEach((job, i) => {
        if (i !== index) job.isOpen = false; // Close all others
      });
    },
    deleteEmployment: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
  },
});

export const {
  addEmployment,
  updateEmploymentField,
  toggleEmploymentAccordion,
  deleteEmployment,
} = employmentSlice.actions;

export default employmentSlice.reducer;
