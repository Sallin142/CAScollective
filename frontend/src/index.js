import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import axios from 'axios';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App className='App' />
  </Provider>
);

export const axiosInstance = axios.create({
  withCredentials: true,
});
