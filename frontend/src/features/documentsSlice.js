import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axios from 'axios';

let apikey = '';

let BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
export const getDocuments = createAsyncThunk(
  'documents/getDocuments',
  async ({ collectionName }, { getState }) => {
    try {
      const apiKey = getState().user.apiKey;
      const response = await axios.get(`${BACKEND_URL}/collections/${collectionName}/documents`, {
        params: {
          apiKey: apiKey
        }
      });
      // Stringify the data field of each document in the response
      const stringifiedJSONDocuments = response.data.map((document) => ({
        ...document,
        data: JSON.stringify(document.data),
      }));
      return stringifiedJSONDocuments;

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      failToast(errorMessage);
      console.log(error);
      throw error;
    }
});

export const createDocument = createAsyncThunk(
  'documents/createDocument', 
  async ({ collectionName, document }, { getState }) => {
  try {
    const apikey = getState().user.apiKey;
    const response = await axios.post(`${BACKEND_URL}/collections/${collectionName}/documents`, {
      ...document
    }, {
      params: {
        apiKey: apikey
      }
    }
    );
    const responseData = response.data;
    successToast('Successfully created new document!');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    failToast(errorMessage);
    console.log(error);
    throw error;
  }
});

export const updateDocument = createAsyncThunk(
  'documents/updateDocument', 
  async ({ collectionName, document }, { getState }) => {
  try {
    const apikey = getState().user.apiKey;
    const response = await axios.put(`${BACKEND_URL}/collections/${collectionName}/documents/${document.key}`, {
      key: document.newKey,
      data: document.newData
    }, {
      params: {
        apiKey: apikey
      }
    });
    successToast('Sucessfully updated the document!');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    failToast(errorMessage);
    console.log(error);
    throw error;
  }
}
);

export const deleteDocument = createAsyncThunk(
  'documents/deleteDocument', 
  async ({ collectionName, documentKey }, { getState }) => {
  try {
    const apikey = getState().user.apiKey;
    const response = await axios.delete(`${BACKEND_URL}/collections/${collectionName}/documents/${documentKey}`, {
      params: {
        apiKey: apikey
      }
    });
    successToast('Sucessfully deleted the document!');
    return response.data;
  } catch (error) {
     const errorMessage = error.response?.data?.message || 'An error occurred';
    failToast(errorMessage);
    throw error;
  }
}
);



const initialState = {
  documents: [],
  status: 'pending',
  error: null,
};

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
  },
  // set states based on the status of the async actions
  extraReducers: (builder) => {
    builder
    .addCase(getDocuments.fulfilled, (state, action) => { // after get success
      state.documents = action.payload;
      state.status = 'fulfilled';
      state.error = null;
    })
    .addMatcher( // pending
      (action) =>
        action.type === getDocuments.pending.type ||
        action.type === createDocument.pending.type ||
        action.type === updateDocument.pending.type ||
        action.type === deleteDocument.pending.type,
      (state) => {
        state.status = 'pending';
        state.error = null;
      }
    )
    .addMatcher( // after success for create, update, delete
      (action) =>
        action.type === createDocument.fulfilled.type ||
        action.type === updateDocument.fulfilled.type ||
        action.type === deleteDocument.fulfilled.type,
      (state, action) => {
        //state.status = 'fulfilled';
        state.error = null;
      }
    )
    .addMatcher( // after fail
      (action) =>
        action.type === getDocuments.rejected.type ||
        action.type === createDocument.rejected.type ||
        action.type === updateDocument.rejected.type ||
        action.type === deleteDocument.rejected.type,
      (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message; // TODO: change this depending on what the server returns
      }
    )
  },
});

export const selectDocuments = (state) => state.documents.documents;
export const selectDocumentsStatus = (state) => state.documents.status;
export const selectDocumentsError = (state) => state.documents.error;

export default documentsSlice.reducer;