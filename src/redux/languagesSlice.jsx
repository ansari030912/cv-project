import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, language: "", proficiency: 0 },
];

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    addLanguage: (state) => {
      const newId = state.length ? state[state.length - 1].id + 1 : 1;
      state.push({ id: newId, language: "", proficiency: 0 });
    },
    updateLanguageField: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    toggleLanguageAccordion: (state, action) => {
      const index = action.payload;
      state[index].isOpen = !state[index].isOpen;
    },
    deleteLanguage: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addLanguage, updateLanguageField, toggleLanguageAccordion, deleteLanguage } = languagesSlice.actions;
export default languagesSlice.reducer;
