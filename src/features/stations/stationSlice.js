import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  form: {
    stationName: '',
    contact: '',
    email: '',
    address: '',
    
    state: '',
    city: '',
    pinCode: '',
  },
  status: 'idle',
  error: null,
};

const stationSlice = createSlice({
  name: 'stations',
  initialState,
  reducers: {
    setFormField: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    resetForm: (state) => {
      state.form = initialState.form;
    },
    addStation: (state, action) => {
      state.list.push(action.payload);
    },
    setStations: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setFormField, resetForm, addStation, setStations } = stationSlice.actions;

export default stationSlice.reducer;