import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { axiosInstance } from '../index';

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


export const getClasses = createAsyncThunk(
    'classes/getClasses',
    async (_, { getState }) => {
      try {
        const apiKey = getState().user.apiKey;
        const response = await axiosInstance.get(`${BACKEND_URL}/classes`)
        return response.data;
      } catch (error) {
        console.log(error);
        return Promise.reject();
      }
    }
);

export const createClass = createAsyncThunk(
    'classes/createClass',
    async ({ name, students }, { getState }) => {
        try {
        const response = await axiosInstance.post(`${BACKEND_URL}/classes`, {
          name: name,
          students: students,
        });
        successToast('Successfully created new class!');
        return response.data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'An error occurred';
          failToast(errorMessage);
          console.log(error);
          return Promise.reject();
        }
    }
);

export const deleteClass = createAsyncThunk(
    'classes/deleteClass',
    async ({ classID }, { getState }) => {
        try {
          const response = await axiosInstance.delete(`${BACKEND_URL}/classes/${classID}`);
          successToast('Sucessfully deleted the class!');
          return response.data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'An error occurred';
          failToast(errorMessage);
          return Promise.reject();
        }
    }
);


export const addStudents = createAsyncThunk(
  'classes/addStudents',
  async ({ classID, students }, { getState }) => {
    try {
      const response = await axiosInstance.post(`${BACKEND_URL}/classes/${classID}/students`, {
        students: students,
      });
      successToast('Successfully added students!');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      failToast(errorMessage);
      console.log(error);
      return Promise.reject();
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'classes/deleteStudent',
  async ({ classID, userID }, { getState }) => {
    try {
      const response = await axiosInstance.delete(`${BACKEND_URL}/classes/${classID}/students/${userID}`);
      successToast('Successfully deleted student!');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      failToast(errorMessage);
      console.log(error);
      throw error;
    }
  }
);


const initialState = {
  classes: [],
  status: 'pending',
  error: null,
};
  
export const classesSlice = createSlice({
    name: 'classes',
    initialState,
    reducers: {},
    // set states based on the status of the async actions
    extraReducers: (builder) => {
      builder
        .addCase(getClasses.fulfilled, (state, action) => {
          // after get success
          state.classes = action.payload;
          state.status = 'fulfilled';
          state.error = null;
        })
        .addMatcher(
          // pending
          (action) =>
            action.type === getClasses.pending.type ||
            action.type === createClass.pending.type ||
            action.type === deleteClass.pending.type ||
            action.type === addStudents.pending.type ||
            action.type === deleteStudent.pending.type,
          (state) => {
            state.status = 'pending';
            state.error = null;
          }
        )
        .addMatcher(
          // after success for create, update, delete
          (action) =>
            action.type === createClass.fulfilled.type ||
            action.type === deleteClass.fulfilled.type ||
            action.type === addStudents.fulfilled.type ||
            action.type === deleteStudent.fulfilled.type,
          (state, action) => {
            state.error = null;
          }
        )
        .addMatcher(
          // after fail
          (action) =>
            action.type === getClasses.rejected.type ||
            action.type === createClass.rejected.type ||
            action.type === deleteClass.rejected.type ||
            action.type === addStudents.rejected.type ||
            action.type === deleteStudent.rejected.type,
          (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
          }
        );
    },
});
  
export const selectClasses = (state) => state.classes.classes;
export const selectClassesStatus = (state) => state.classes.status;
export const selectClassesError = (state) => state.classes.error;

export default classesSlice.reducer;