import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, title: "", institution: "", start_date: "", end_date: "", isOpen: false },
];

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state) => {
      const newId = state.length ? state[state.length - 1].id + 1 : 1;
      state.push({
        id: newId,
        title: "",
        institution: "",
        start_date: "",
        end_date: "",
        isOpen: true,  // New courses start open
      });
    },
    updateCourseField: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    toggleCourseAccordion: (state, action) => {
      const index = action.payload;
      state[index].isOpen = !state[index].isOpen;
    },
    deleteCourse: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
  },
});

export const { addCourse, updateCourseField, toggleCourseAccordion, deleteCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
