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
      const newId = state.length ? state[state.length - 1].id + 1 : 1;
      state.push({
        id: newId,
        job_title: "",
        employer: "",
        city: "",
        description: "",
        start_date: "",
        end_date: "",
        is_current: false,
        isOpen: true, // New entries open by default
      });
    },
    updateEmploymentField: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    toggleEmploymentAccordion: (state, action) => {
      const index = action.payload;
      state[index].isOpen = !state[index].isOpen;
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
