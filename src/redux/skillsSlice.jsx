import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { name: "", level: 3, isOpen: true },
];

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    addSkill: (state) => {
      state.push({ name: "", level: 3, isOpen: true }); // New skills open by default
    },
    updateSkillField: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    toggleSkillAccordion: (state, action) => {
      const index = action.payload;
      state[index].isOpen = !state[index].isOpen;
    },
    deleteSkill: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
  },
});

export const { addSkill, updateSkillField, toggleSkillAccordion, deleteSkill } = skillsSlice.actions;
export default skillsSlice.reducer;
