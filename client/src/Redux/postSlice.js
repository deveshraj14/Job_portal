import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async thunk for fetching posts
export const data = createAsyncThunk('jsonuser', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;  // return the data directly
  } catch (error) {
    return rejectWithValue(error.message);  // send error message on failure
  }
});

// Post slice
export const postSlice = createSlice({
  name: 'posts',  // slice name
  initialState: {
    data: [],  // stores the fetched data
    loading: false,  // indicates loading status
    error: '',  // stores any error message
  },
  reducers: {},  // you can add sync reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(data.pending, (state) => {
        state.loading = true;
      })
      .addCase(data.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(data.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;  // Export the reducer to use in the store
