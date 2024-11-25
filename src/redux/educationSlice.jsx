import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    degree: "",
    school_name: "",
    city: "",
    start_date: "",
    end_date: "",
    description: "",
    isOpen: true,
  },
];

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    addEducation: (state) => {
      if (state.length >= 3) return; // Prevent adding more than 3 entries
      const newId = state.length ? state[state.length - 1].id + 1 : 1;
      state.forEach((edu) => (edu.isOpen = false)); // Close all accordions
      state.push({
        id: newId,
        degree: "",
        school_name: "",
        city: "",
        start_date: "",
        end_date: "",
        description: "",
        isOpen: true, // Open the new accordion
      });
    },
    updateEducationField: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    toggleEducationAccordion: (state, action) => {
      const index = action.payload;
      state[index].isOpen = !state[index].isOpen; // Toggle open/close
      state.forEach((edu, i) => {
        if (i !== index) edu.isOpen = false; // Close all others
      });
    },
    deleteEducation: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
  },
});

export const {
  addEducation,
  updateEducationField,
  toggleEducationAccordion,
  deleteEducation,
} = educationSlice.actions;

export default educationSlice.reducer;
