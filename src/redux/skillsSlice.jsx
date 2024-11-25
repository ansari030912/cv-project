import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { name: "", level: 3, isOpen: true },
];

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    addSkill: (state) => {
      if (state.length >= 5) return; // Limit to 5 skills
      state.forEach((skill) => (skill.isOpen = false)); // Close all other accordions
      state.push({ name: "", level: 3, isOpen: true }); // New skill open by default
    },
    updateSkillField: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    toggleSkillAccordion: (state, action) => {
      const index = action.payload;
      state[index].isOpen = !state[index].isOpen; // Toggle current accordion
      state.forEach((skill, i) => {
        if (i !== index) skill.isOpen = false; // Close all other accordions
      });
    },
    deleteSkill: (state, action) => {
      const index = action.payload;
      state.splice(index, 1); // Delete the selected skill
    },
  },
});

export const { addSkill, updateSkillField, toggleSkillAccordion, deleteSkill } =
  skillsSlice.actions;

export default skillsSlice.reducer;
