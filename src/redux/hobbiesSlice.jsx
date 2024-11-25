import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  description: "", // Initial description for hobbies
};

const hobbiesSlice = createSlice({
  name: "hobbies",
  initialState,
  reducers: {
    // Action to set the description of hobbies
    setHobbiesDescription: (state, action) => {
      state.description = action.payload;
    },

    // Action to reset the description to an empty string
    resetHobbiesDescription: (state) => {
      state.description = "";
    },
  },
});

// Exporting the actions
export const { setHobbiesDescription, resetHobbiesDescription } =
  hobbiesSlice.actions;

// Exporting the reducer
export default hobbiesSlice.reducer;
