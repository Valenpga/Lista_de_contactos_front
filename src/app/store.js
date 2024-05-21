import { configureStore } from '@reduxjs/toolkit';
import messageReducer from '../message/messageSlice';
import contactSlice from './contact/contactSlice';


const store = configureStore({
  reducer: {
    message: messageReducer,
  },
});

export default store;
