import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 0, label: "", url: "", isOpen: true }, // Default state with isOpen
];

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    addLink: (state) => {
      const newId = state.length ? state[state.length - 1].id + 1 : 1;
      state.push({ id: newId, label: "", url: "", isOpen: true }); // New links open by default
    },
    updateLinkField: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    toggleLinkAccordion: (state, action) => {
      const index = action.payload;
      state[index].isOpen = !state[index].isOpen;
    },
    deleteLink: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
  },
});

export const { addLink, updateLinkField, toggleLinkAccordion, deleteLink } = linksSlice.actions;
export default linksSlice.reducer;
