import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isShowSidebar: true,
    itemId: null
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
        }
    }
});

export const { toggleSidebar, setItemId } = layoutSlice.actions;
export default layoutSlice.reducer;
