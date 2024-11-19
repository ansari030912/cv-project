import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leftComponents: [
    { name: "SummaryCard", component: "SummaryCard" },
    { name: "EducationHistory", component: "EducationHistory" },
    { name: "EmploymentHistoryCard", component: "EmploymentHistoryCard" },
    { name: "CoursesCard", component: "CoursesCard" },
    { name: "InternShipCard", component: "InternShipCard" },
  ],
  rightComponents: [
    { name: "SkillsCard", component: "SkillsCard" },
    { name: "LinksCard", component: "LinksCard" },
    { name: "LanguageCard", component: "LanguageCard" },
    { name: "HobbiesCard", component: "HobbiesCard" },
  ],
};

const orderSlice = createSlice({
  name: "componentOrder",
  initialState,
  reducers: {
    updateLeftComponents: (state, action) => {
      state.leftComponents = action.payload;
    },
    updateRightComponents: (state, action) => {
      state.rightComponents = action.payload;
    },
  },
});

export const { updateLeftComponents, updateRightComponents } =
  orderSlice.actions;

export default orderSlice.reducer;
