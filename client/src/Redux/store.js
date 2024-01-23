// Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Slice/index.js';
import logger from 'redux-logger'
// import loggerMiddleware from './middleware.js';
// import {thunk }from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
