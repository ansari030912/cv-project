import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "./personalInfoSlice";
import coursesReducer from "./coursesSlice";
import educationReducer from "./educationSlice";
import employmentReducer from "./employmentSlice";
import hobbiesReducer from "./hobbiesSlice";
import internshipsReducer from "./internshipsSlice";
import languagesReducer from "./languagesSlice";
import linksReducer from "./linksSlice";
import skillsReducer from "./skillsSlice";
import summaryReducer from "./summarySlice";
import orderReducer from "./orderSlice"; // Ensure this file exists in the correct path

// Ensure all imported slices are correct
export const store = configureStore({
  reducer: {
    personalInfo: personalInfoReducer,
    courses: coursesReducer,
    education: educationReducer,
    employment: employmentReducer,
    hobbies: hobbiesReducer,
    internships: internshipsReducer,
    languages: languagesReducer,
    links: linksReducer,
    skills: skillsReducer,
    summary: summaryReducer,
    order: orderReducer,
  },
});
