import { createSlice } from '@reduxjs/toolkit';

type InitialState = {

    /**
     * Defines is sidebar is open.
     */
    isShowSidebar: boolean,

    /**
     * An array containing keys to identify the final active element.
     */
    sidebarActiveItemId: Array<number>,

    /**
     * Content of active element.
     */
    search: string
}

const initialState: InitialState = {
    isShowSidebar: true,
    sidebarActiveItemId: [],
    search: ''
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
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    }
});

export const { toggleSidebar, setSidebarActiveItemId, setitemContent, setSearch } = layoutSlice.actions;
export default layoutSlice.reducer;
