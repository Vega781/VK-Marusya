import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true,
};

export const authIsOpenSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        closeAuthModal(state) {
            state.isOpen = false;
        },
    }
});

export const { closeAuthModal } = authIsOpenSlice.actions;