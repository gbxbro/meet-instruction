import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isShowSidebar: true,
    itemId: null,
    itemContent: null
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toggleSidebar: state => {
            state.isShowSidebar = !state.isShowSidebar;
        },
        setItemId: (state, action) => {
            state.itemId = action.payload;
        },
        setitemContent: (state, action) => {
            state.itemContent = action.payload;
        }
    }
});

export const { toggleSidebar, setItemId, setitemContent } = layoutSlice.actions;
export default layoutSlice.reducer;
