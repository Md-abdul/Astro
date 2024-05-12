

// import { configureStore, Action } from '@reduxjs/toolkit';
// import { ThunkAction } from 'redux-thunk';
// import astrologersReducer from './astrologersSlice';
// // import rootReducer from './reducers'; // Import your root reducer

// export const store = configureStore({
//   reducer: {
//     astrologers: astrologersReducer,
//   }
//   // Add any middleware or enhancers as needed
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;


import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import astrologersReducer from './astrologersSlice';

export const store = configureStore({
  reducer: {
    astrologers: astrologersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
