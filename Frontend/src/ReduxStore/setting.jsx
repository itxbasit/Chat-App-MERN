
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'

const headingSlice = createSlice({
  name: 'heading',
  initialState: {
    value: 'Profile Settings'
  },
  reducers: {
    setHeading: (state, action) => {
        state.value = action.payload.value;
    }
  },
});

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: Cookies.get('token') || null
  },
  reducers: {
    setToken: (state, action) => {
        state.value = action.payload.value;
    }
  },
});

const userSlice = createSlice({
  name: 'filUser',
  initialState: {
    value: ""
  },
  reducers: {
    setFilUser: (state, action) => {
        state.value = action.payload.value;
    }
  },
});

const msgSlice = createSlice({
  name: 'msgV',
  initialState: {
    value: null
  },
  reducers: {
    setMsgV: (state, action) => {
        state.value = action.payload.value;
    }
  },
});

export const { setHeading } = headingSlice.actions;
export const { setToken } = tokenSlice.actions;
export const { setFilUser } = userSlice.actions;
export const { setMsgV } = msgSlice.actions;


export const headingReducer = headingSlice.reducer;
export const tokenReducer = tokenSlice.reducer;
export const userReducer = userSlice.reducer;
export const inputReducer = msgSlice.reducer;