// counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface searchTextState {
    value: string;
}

const initialState: searchTextState = {
    value: '',
};

export const searchTextSlice = createSlice({
    name: 'clear_text',
    initialState,
    reducers: {
        setSearchText(state, action) {
            state.value = action.payload;
        },
        clearText: (state) => {
            state.value = '';
        }
    }
});

export const { clearText, setSearchText } = searchTextSlice.actions;