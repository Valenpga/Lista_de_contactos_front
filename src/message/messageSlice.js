import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMessage = createAsyncThunk('message/fetchMessage', async () => {
  const response = await fetch('http://localhost:3000/api/message');
  const data = await response.json();
  return data.message;
});

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: '',
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(fetchMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default messageSlice.reducer;
