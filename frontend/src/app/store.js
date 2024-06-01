import { configureStore } from '@reduxjs/toolkit';
import collectionsReducer from '../features/collectionsSlice';
import documentsReducer from '../features/documentsSlice';
import userReducer from '../features/userSlice';
import classesReducer from '../features/classesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    collections: collectionsReducer,
    documents: documentsReducer,
    classes: classesReducer,
  },
});
