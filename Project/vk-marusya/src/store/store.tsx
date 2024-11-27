import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { searchTextSlice } from './slices/searchTextSlice';

const rootReducer = combineReducers({
    searchText: searchTextSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;