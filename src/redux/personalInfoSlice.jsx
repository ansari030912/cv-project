import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobTitle: "",
  firstName: "",
  lastName: "",
  city: "",
  country: "",
  phone: "",
  email: "",
};

const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updatePersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;
