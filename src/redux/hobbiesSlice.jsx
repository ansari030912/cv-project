import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  description: "",
};

const hobbiesSlice = createSlice({
  name: 'hobbies',
  initialState,
  reducers: {
    setHobbiesDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const { setHobbiesDescription } = hobbiesSlice.actions;
export default hobbiesSlice.reducer;
