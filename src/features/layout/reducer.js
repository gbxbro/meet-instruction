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
    sidebarActiveItemId: [],
    sidebarActiveItemData: {}
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toggleSidebar: state => {
            state.isShowSidebar = !state.isShowSidebar;
        },
        setSidebarActiveItemId: (state, action) => {
            state.sidebarActiveItemId = action.payload;
        },
        setSidebarActiveItemData: (state, action) => {
            state.sidebarActiveItemData = action.payload;
        }
    }
});

export const { toggleSidebar, setSidebarActiveItemId, setitemContent, setSidebarActiveItemData } = layoutSlice.actions;
export default layoutSlice.reducer;
