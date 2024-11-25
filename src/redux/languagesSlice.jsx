import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, language: "", proficiency: 0, isOpen: true }, // Default state with isOpen
];

const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    addLanguage: (state) => {
      if (state.length >= 5) return; // Limit to 5 languages
      state.forEach((lang) => (lang.isOpen = false)); // Close all other accordions
      const newId = state.length ? state[state.length - 1].id + 1 : 1;
      state.push({ id: newId, language: "", proficiency: 0, isOpen: true }); // New language open by default
    },
    updateLanguageField: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    toggleLanguageAccordion: (state, action) => {
      const index = action.payload;
      state[index].isOpen = !state[index].isOpen; // Toggle current accordion
      state.forEach((lang, i) => {
        if (i !== index) lang.isOpen = false; // Close all other accordions
      });
    },
    deleteLanguage: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
  },
});

export const {
  addLanguage,
  updateLanguageField,
  toggleLanguageAccordion,
  deleteLanguage,
} = languagesSlice.actions;

export default languagesSlice.reducer;
