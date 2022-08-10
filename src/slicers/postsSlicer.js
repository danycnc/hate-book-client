import { createSlice } from '@reduxjs/toolkit';

export const postsSlicer = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    populate: (state, action) => (state = action.payload),
    reset: (state, action) => (state = []),
  },
});
