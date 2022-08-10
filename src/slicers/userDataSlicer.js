import { createSlice } from '@reduxjs/toolkit';

export const userSlicer = createSlice({
  name: 'userData',
  initialState: {},
  reducers: {
    populate: (state, action) => (state = action.payload),
    reset: (state, action) => (state = {}),
  },
});
