import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Acción asincrónica para obtener los contactos desde la API
export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await fetch('http://localhost:3000/api/contacts');
  const data = await response.json();
  return data;
});

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    updateContact(state, action) {
      const index = state.contacts.findIndex(contact => contact._id === action.payload._id);
      state.contacts[index] = action.payload;
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(contact => contact._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addContact, updateContact, deleteContact } = contactSlice.actions;

export default contactSlice.reducer;
