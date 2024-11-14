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
      const newId = state.length ? state[state.length - 1].id + 1 : 1;
      state.push({
        id: newId,
        degree: "",
        school_name: "",
        city: "",
        start_date: "",
        end_date: "",
        description: "",
        isOpen: true,
      });
    },
    updateEducationField: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    toggleEducationAccordion: (state, action) => {
      const index = action.payload;
      state[index].isOpen = !state[index].isOpen;
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
