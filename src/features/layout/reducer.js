import { createSlice } from '@reduxjs/toolkit';

type InitialState = {

    /**
     * Defines is sidebar is open.
     */
    isShowSidebar: boolean,

    /**
     * An array containing keys to identify the final active element.
     */
    sidebarActiveItem: Array<number>,

    /**
     * Content of active element.
     */
    sidebarActiveItemContent: string
}

const initialState: InitialState = {
    isShowSidebar: true,
    sidebarActiveItem: [],
    sidebarActiveItemContent: null
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toggleSidebar: state => {
            state.isShowSidebar = !state.isShowSidebar;
        },
        setSidebarActiveItem: (state, action) => {
            state.sidebarActiveItem = action.payload;
        },
        setSidebarActiveItemContent: (state, action) => {
            state.sidebarActiveItemContent = action.payload;
        }
    }
});

export const { toggleSidebar, setSidebarActiveItem, setitemContent, setSidebarActiveItemContent } = layoutSlice.actions;
export default layoutSlice.reducer;
