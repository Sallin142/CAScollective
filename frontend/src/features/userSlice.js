import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { axiosInstance } from '../index';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


// Async thunk to fetch API key
export const getApiKey = createAsyncThunk('apiKey/getApiKey', async ({}, { getState }) => {
  try {
    const response = await axiosInstance.get(`${BACKEND_URL}/api/`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// Async thunk to reset API key
export const resetApiKey = createAsyncThunk('apiKey/resetApiKey', async (_, { getState }) => {
  try {
    const { userId } = getState().user; // Extract userId from the state
    if (!userId) throw new Error('User ID is not available.');
    const response = await axiosInstance.post(`${BACKEND_URL}/api/`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const validateUser = createAsyncThunk('user/validateUser', async ({ ticket }) => {
  try {
    const response = await axiosInstance.get(`${BACKEND_URL}/cas/validate?ticket=${ticket}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

function parseAdminString() {
  const adminString = window.localStorage.getItem('admin');
  return JSON.parse(adminString);
}

const initialState = {
  userId: window.localStorage.getItem('userId'),
  apiKey: window.localStorage.getItem('apiKey'),
  admin: parseAdminString(),
  isLoggedIn: window.localStorage.getItem('isLoggedIn') || false,
};

export const collectionsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      window.localStorage.setItem('userId', action.payload);
    },
    removeUser: (state) => {
      window.localStorage.removeItem('userId');
      window.localStorage.removeItem('apiKey');
      window.localStorage.removeItem('isLoggedIn');
      window.localStorage.removeItem('admin');
      state.userId = undefined;
      state.apiKey = undefined;
      state.isLoggedIn = false;
      state.admin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => 
        action.type === getApiKey.pending.type ||
        action.type === resetApiKey.pending.type,
        (state) => {
          
        }
      )
      .addMatcher(
        (action) => 
        action.type === getApiKey.fulfilled.type ||
        action.type === resetApiKey.fulfilled.type,
        (state, action) => {
          state.apiKey = action.payload.apiKey;
          window.localStorage.setItem('apiKey', action.payload.apiKey);
          
        }
      )
      .addMatcher(
        (action) =>
        action.type === validateUser.fulfilled.type,
        (state, action) => {
          state.userId = action.payload.userID;
          state.apiKey = action.payload.apiKey;
          state.isLoggedIn = true;
          state.admin = action.payload.admin;
          window.localStorage.setItem('userId', action.payload.userID);
          window.localStorage.setItem('apiKey', action.payload.apiKey);
          window.localStorage.setItem('isLoggedIn', true);
          window.localStorage.setItem('admin', action.payload.admin);
          successToast('Successfully logged in!');
        }
      )
      .addMatcher(
        (action) => 
        action.type === getApiKey.rejected.type ||
        action.type === resetApiKey.rejected.type ||
        action.type === validateUser.rejected.type,
        (state) => {
          //console.log('rejected');
        }
      )
  },
});

function successToast(message) {
  toast.success(message, {
    icon: '✅',
    style: {
      borderRadius: '10px',
      background: '#07bc0c',
      color: '#000',
    },
  });
}

function failToast(errorMessage) {
  toast.error(errorMessage, {
    icon: '❌',
    style: {
      borderRadius: '10px',
      background: '#d00000',
      color: '#fff',
    },
  });
}

export const selectApiKey = (state) => state.user.apiKey;
export const selectUserId = (state) => state.user.userId;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectAdmin = (state) => state.user.admin;

export const { setUserId, removeUser } = collectionsSlice.actions;

export default collectionsSlice.reducer;