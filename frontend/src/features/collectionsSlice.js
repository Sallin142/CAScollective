import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axios from 'axios';

let apikey = '';

let BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

if (!BACKEND_URL) {
  throw "REACT_APP_BACKEND_URL undefined in frontend .env";
}

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

// async actions
export const getCollections = createAsyncThunk(
  'collections/getCollections', 
  async ({}, { getState }) => {
  try {
    const apiKey = getState().user.apiKey;
    
    const response = await axios.get(`${BACKEND_URL}/collections`, {
      params: {
        apiKey: apiKey
      }
    });
    return response.data;
  } catch(error) {
    console.log(error.response?.data?.message);
    const errorMessage = error.response?.data?.message || 'An error occurred';
    failToast(errorMessage);
    console.log(error);
    throw error;
  }
});

export const createCollection = createAsyncThunk(
  'collections/createCollection', 
  async ({collectionName}, { getState }) => {
  try {
    const apiKey = getState().user.apiKey;
    const response = await axios.post(`${BACKEND_URL}/collections`, {
      name: collectionName
    }, {
      params: {
        apiKey: apiKey
      }
    });
    successToast('Successfully created new collection!');
    return response.data;
  } catch(error) {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    failToast(errorMessage);
    console.log(error)
    throw error;
  }
});

export const updateCollection = createAsyncThunk(
  'collections/updateCollection', 
  async ({ collectionName, newName }, { getState }) => {
  try {
    console.log('updateCollection');
    console.log(collectionName);
    const apiKey = getState().user.apiKey;
    const response = await axios.put(`${BACKEND_URL}/collections/${collectionName}`, { 
      name: newName,
    }, {
      params: {
        apiKey: apiKey,
      },
    });
    successToast('Successfully updated the collection!')
    return response.data;
  } catch(error) {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    failToast(errorMessage);
    console.log(error);
    throw error;
  }
});

export const deleteCollection = createAsyncThunk('collections/deleteCollection', async ({ collectionName }, { getState }) => {
  try {
    const apiKey = getState().user.apiKey;
    const response = await axios.delete(`${BACKEND_URL}/collections/${collectionName}`, {
      params: {
        apiKey: apiKey
      }
    });
    successToast('Successfully deleted the collection!');
    return response.data;
  } catch(error) {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    failToast(errorMessage);
    console.log(error);
    throw error;
  }
});

const initialState = {
  collections: [],
  status: 'pending',
  error: null,
};

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
  },
  // set states based on the status of the async actions
  extraReducers: (builder) => {
    builder
    .addCase(getCollections.fulfilled, (state, action) => { // after get success
      state.collections = action.payload;
      state.status = 'fulfilled';
      state.error = null;
    })
    .addMatcher( // pending
      (action) =>
        action.type === getCollections.pending.type ||
        action.type === createCollection.pending.type ||
        action.type === updateCollection.pending.type ||
        action.type === deleteCollection.pending.type,
      (state) => {
        state.status = 'pending';
        state.error = null;
      }
    )
    .addMatcher( // after success for create, update, delete
      (action) =>
        action.type === createCollection.fulfilled.type ||
        action.type === updateCollection.fulfilled.type ||
        action.type === deleteCollection.fulfilled.type,
      (state) => {
        //state.status = 'fulfilled';
        state.error = null;
      }
    )
    .addMatcher( // after fail
      (action) =>
        action.type === getCollections.rejected.type ||
        action.type === createCollection.rejected.type ||
        action.type === updateCollection.rejected.type ||
        action.type === deleteCollection.rejected.type,
      (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message; // TODO: change this depending on what the server returns
        state.collections = [];
      }
    )
  },
});

export const selectCollections = (state) => state.collections.collections;
export const selectCollectionStatus = (state) => state.collections.status;

export default collectionsSlice.reducer;
