import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: "courses",
  initialState: [
    { id: 1, title: "", institution: "", start_date: "", end_date: "", isOpen: true },
  ],
  reducers: {
    addCourse: (state) => {
      const newId = state.length ? state[state.length - 1].id + 1 : 1;
      state.forEach((course) => (course.isOpen = false)); // Close all other accordions
      state.push({
        id: newId,
        title: "",
        institution: "",
        start_date: "",
        end_date: "",
        isOpen: true, // Open the new course accordion
      });
    },
    updateCourseField: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    deleteCourse: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
    toggleCourseAccordion: (state, action) => {
      const index = action.payload;
      state[index].isOpen = !state[index].isOpen; // Toggle the selected accordion
    },
    setSingleOpenAccordion: (state, action) => {
      const index = action.payload;
      state.forEach((course, i) => {
        course.isOpen = i === index;
      });
    },
  },
});

export const {
  addCourse,
  updateCourseField,
  deleteCourse,
  toggleCourseAccordion,
  setSingleOpenAccordion,
} = coursesSlice.actions;

export default coursesSlice.reducer;
