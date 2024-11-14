import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  description: "",
};

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    setDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const { setDescription } = summarySlice.actions;
export default summarySlice.reducer;
